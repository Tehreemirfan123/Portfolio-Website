import os
import requests
from typing import List, Dict, Any
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

class GitHubService:
    def __init__(self):
        self.github_username = os.environ.get('GITHUB_USERNAME', 'Tehreemirfan123')
        self.github_api_base = 'https://api.github.com'
        self.cache = {}
        self.cache_duration = timedelta(hours=1)
        
    def get_user_repositories(self) -> List[Dict[str, Any]]:
        """Fetch public repositories for the user"""
        try:
            # Check cache
            cache_key = f'repos_{self.github_username}'
            if cache_key in self.cache:
                cached_data, cached_time = self.cache[cache_key]
                if datetime.now() - cached_time < self.cache_duration:
                    logger.info(f"Returning cached GitHub repos for {self.github_username}")
                    return cached_data
            
            # Fetch from GitHub API
            url = f'{self.github_api_base}/users/{self.github_username}/repos'
            params = {
                'sort': 'updated',
                'per_page': 100,
                'type': 'public'
            }
            
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            
            repos = response.json()
            
            # Format and filter repositories
            formatted_repos = []
            for repo in repos:
                # Skip forks unless they have significant stars
                if repo.get('fork') and repo.get('stargazers_count', 0) < 5:
                    continue
                    
                formatted_repo = {
                    'id': repo['id'],
                    'name': repo['name'],
                    'description': repo.get('description', ''),
                    'html_url': repo['html_url'],
                    'topics': repo.get('topics', []),
                    'stargazers_count': repo.get('stargazers_count', 0),
                    'language': repo.get('language', 'Unknown'),
                    'updated_at': repo['updated_at'],
                    'created_at': repo['created_at']
                }
                formatted_repos.append(formatted_repo)
            
            # Cache the results
            self.cache[cache_key] = (formatted_repos, datetime.now())
            
            logger.info(f"Fetched {len(formatted_repos)} repos from GitHub for {self.github_username}")
            return formatted_repos
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching GitHub repos: {str(e)}")
            return []
        except Exception as e:
            logger.error(f"Unexpected error in GitHub service: {str(e)}")
            return []
    
    def get_featured_projects(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Get top repositories sorted by stars and recent updates"""
        repos = self.get_user_repositories()
        
        # Sort by stars and update date
        sorted_repos = sorted(
            repos,
            key=lambda x: (x['stargazers_count'], x['updated_at']),
            reverse=True
        )
        
        return sorted_repos[:limit]

# Create singleton instance
github_service = GitHubService()
