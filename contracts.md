# API Contracts for Tehreem Irfan Portfolio Backend

## 1. GitHub Projects API

### Endpoint: GET /api/github/projects
**Description:** Fetches repositories from GitHub user profile
**Frontend Usage:** Replace mock projects data in ProjectsSection
**Response:**
```json
{
  "projects": [
    {
      "id": "repo_id",
      "name": "repo_name",
      "description": "repo_description",
      "html_url": "github_url",
      "topics": ["tags"],
      "stargazers_count": 0,
      "language": "primary_language",
      "updated_at": "timestamp"
    }
  ]
}
```

## 2. Contact Form Email API

### Endpoint: POST /api/contact/send
**Description:** Sends email from contact form
**Frontend Usage:** ContactSection form submission
**Request Body:**
```json
{
  "name": "sender_name",
  "email": "sender_email",
  "subject": "email_subject",
  "message": "email_message"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## Integration Points

### Frontend Changes Required:
1. **ProjectsSection.jsx**: 
   - Create API call to `/api/github/projects`
   - Map GitHub data to project cards
   - Merge with resume projects data
   
2. **ContactSection.jsx**:
   - Update handleSubmit to call `/api/contact/send`
   - Handle success/error responses
   - Show toast notifications

### Backend Implementation:
1. **GitHub Service** (`/backend/services/github_service.py`):
   - Fetch repos using GitHub REST API
   - Filter and format data
   - Cache results for performance
   
2. **Email Service** (`/backend/services/email_service.py`):
   - SMTP configuration for sending emails
   - Email templates
   - Validation and sanitization

### Environment Variables Needed:
```
GITHUB_USERNAME=Tehreemirfan123
RECIPIENT_EMAIL=tehreemirfan786@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<email_for_sending>
SMTP_PASSWORD=<app_password>
```
