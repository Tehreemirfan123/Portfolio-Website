"""
Backend tests for Tehreem Irfan portfolio website.
Covers:
  - GET  /api/                 -> Health check
  - GET  /api/github/projects  -> GitHub repos for Tehreemirfan123
  - POST /api/contact/send     -> Contact form (mock mode + validation + persistence)
"""
import os
import time
import uuid
import pytest
import requests
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path

# Load backend env to access Mongo for persistence verification
load_dotenv(Path("/app/backend/.env"))

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://tehreem-works.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")


@pytest.fixture(scope="session")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def mongo_db():
    if not MONGO_URL or not DB_NAME:
        pytest.skip("Mongo env vars not configured")
    client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=3000)
    yield client[DB_NAME]
    client.close()


# ---------- Health Check ----------
class TestHealth:
    def test_root_health(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("message") == "Hello World"


# ---------- GitHub Projects ----------
class TestGithubProjects:
    def test_github_projects_returns_list(self, session):
        r = session.get(f"{API}/github/projects", timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "projects" in data
        assert isinstance(data["projects"], list)

    def test_github_projects_schema(self, session):
        r = session.get(f"{API}/github/projects", timeout=30)
        assert r.status_code == 200
        projects = r.json()["projects"]
        # If list is empty (e.g., user has no public repos or rate limit), surface it
        if not projects:
            pytest.skip("GitHub returned 0 projects (possible rate limit or empty account)")
        required = {"id", "name", "description", "html_url", "topics",
                    "stargazers_count", "language", "updated_at"}
        first = projects[0]
        missing = required - set(first.keys())
        assert not missing, f"Missing fields in project: {missing}. Got keys: {list(first.keys())}"
        assert isinstance(first["topics"], list)
        assert isinstance(first["stargazers_count"], int)
        assert first["html_url"].startswith("https://github.com/")

    def test_github_projects_limited(self, session):
        """Endpoint should return at most 20 projects (limit hard-coded in server.py)."""
        r = session.get(f"{API}/github/projects", timeout=30)
        assert r.status_code == 200
        assert len(r.json()["projects"]) <= 20


# ---------- Contact Form ----------
class TestContactForm:
    def test_contact_send_mock_success(self, session, mongo_db):
        unique = uuid.uuid4().hex[:8]
        payload = {
            "name": f"TEST_User_{unique}",
            "email": f"test_{unique}@example.com",
            "subject": f"TEST_Subject_{unique}",
            "message": "This is a test message from backend_test.py"
        }
        r = session.post(f"{API}/contact/send", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()

        # SMTP not configured => mock=True, success=False per email_service.py
        assert "success" in data
        assert "message" in data
        assert "mock" in data
        assert data["mock"] is True, f"Expected mock=True when SMTP not configured, got: {data}"
        assert data["success"] is False
        assert isinstance(data["message"], str) and len(data["message"]) > 0

        # Verify persistence
        time.sleep(0.3)
        doc = mongo_db.contact_submissions.find_one({"subject": payload["subject"]})
        assert doc is not None, "Submission not persisted to MongoDB"
        assert doc["name"] == payload["name"]
        assert doc["email"] == payload["email"]
        assert doc["message"] == payload["message"]
        assert "timestamp" in doc
        assert doc.get("email_sent") is False  # because mock mode

        # Cleanup
        mongo_db.contact_submissions.delete_many({"subject": payload["subject"]})

    @pytest.mark.parametrize("bad_email", ["notanemail", "missing@tld", "@no-local.com", "spaces in@email.com", ""])
    def test_contact_send_rejects_invalid_email(self, session, bad_email):
        payload = {
            "name": "TEST_Invalid",
            "email": bad_email,
            "subject": "TEST_invalid_email",
            "message": "test"
        }
        r = session.post(f"{API}/contact/send", json=payload)
        assert r.status_code == 422, f"Expected 422 for invalid email '{bad_email}', got {r.status_code}: {r.text}"

    def test_contact_send_missing_fields(self, session):
        r = session.post(f"{API}/contact/send", json={"name": "x"})
        assert r.status_code == 422

    def test_contact_send_valid_email_format(self, session, mongo_db):
        unique = uuid.uuid4().hex[:8]
        payload = {
            "name": f"TEST_Valid_{unique}",
            "email": f"valid_{unique}@domain.co",
            "subject": f"TEST_Valid_Subject_{unique}",
            "message": "Valid msg"
        }
        r = session.post(f"{API}/contact/send", json=payload)
        assert r.status_code == 200
        # Cleanup
        mongo_db.contact_submissions.delete_many({"subject": payload["subject"]})
