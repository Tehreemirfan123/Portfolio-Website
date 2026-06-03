import os
import asyncio
import resend
from pathlib import Path
from dotenv import load_dotenv
from typing import Dict, Any
import logging

# Load .env at module level so env vars are available regardless of import order
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.recipient_email = os.environ.get('RECIPIENT_EMAIL', 'tehreemirfan786@gmail.com')
        self.sender_email = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
        self.api_key = os.environ.get('RESEND_API_KEY', '')
        
        if self.api_key:
            resend.api_key = self.api_key
            logger.info(f"Resend email service initialized with sender: {self.sender_email}")
        else:
            logger.warning("RESEND_API_KEY not found in environment")
    
    async def send_contact_email(self, name: str, email: str, subject: str, message: str) -> Dict[str, Any]:
        """Send contact form email using Resend"""
        if not self.api_key:
            logger.warning("RESEND_API_KEY not configured, email not sent")
            return {
                'success': False,
                'message': 'Email service not configured. Please contact directly via email.',
                'mock': True
            }
        
        try:
            html_body = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; padding: 20px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <tr>
                            <td style="background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); padding: 30px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                                <p style="color: #e0f2fe; margin: 8px 0 0 0; font-size: 14px;">From your portfolio website</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 30px;">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">
                                            <strong style="color: #555; display: inline-block; width: 80px;">From:</strong>
                                            <span style="color: #333;">{name}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">
                                            <strong style="color: #555; display: inline-block; width: 80px;">Email:</strong>
                                            <a href="mailto:{email}" style="color: #06b6d4; text-decoration: none;">{email}</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">
                                            <strong style="color: #555; display: inline-block; width: 80px;">Subject:</strong>
                                            <span style="color: #333;">{subject}</span>
                                        </td>
                                    </tr>
                                </table>
                                
                                <div style="margin-top: 25px; padding: 20px; background-color: #f9fafb; border-left: 4px solid #06b6d4; border-radius: 4px;">
                                    <strong style="color: #555; display: block; margin-bottom: 10px;">Message:</strong>
                                    <p style="margin: 0; color: #333; white-space: pre-wrap;">{message}</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #eee;">
                                <p style="margin: 0; color: #888; font-size: 12px;">
                                    This email was sent from your portfolio website contact form.
                                </p>
                                <p style="margin: 5px 0 0 0; color: #888; font-size: 12px;">
                                    Reply directly to this email to respond to {name}.
                                </p>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>
            """
            
            params = {
                "from": self.sender_email,
                "to": [self.recipient_email],
                "subject": f"Portfolio Contact: {subject}",
                "html": html_body,
                "reply_to": email
            }
            
            # Run sync SDK in thread to keep FastAPI non-blocking
            result = await asyncio.to_thread(resend.Emails.send, params)
            
            logger.info(f"Contact email sent successfully from {email}, id: {result.get('id')}")
            return {
                'success': True,
                'message': "Message sent successfully! I'll get back to you soon.",
                'email_id': result.get('id', '')
            }
            
        except Exception as e:
            logger.error(f"Error sending email via Resend: {str(e)}")
            return {
                'success': False,
                'message': 'Failed to send email. Please try again or contact directly.'
            }

# Create singleton instance
email_service = EmailService()
