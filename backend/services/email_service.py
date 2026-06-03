import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.recipient_email = os.environ.get('RECIPIENT_EMAIL', 'tehreemirfan786@gmail.com')
        self.smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        self.smtp_user = os.environ.get('SMTP_USER', '')
        self.smtp_password = os.environ.get('SMTP_PASSWORD', '')
        
    def send_contact_email(self, name: str, email: str, subject: str, message: str) -> Dict[str, Any]:
        """Send contact form email"""
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f'Portfolio Contact: {subject}'
            msg['From'] = self.smtp_user
            msg['To'] = self.recipient_email
            msg['Reply-To'] = email
            
            # Create email body
            html_body = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                        <h2 style="color: #06b6d4; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">
                            New Contact Form Submission
                        </h2>
                        
                        <div style="margin: 20px 0;">
                            <p style="margin: 10px 0;">
                                <strong style="color: #555;">From:</strong> {name}
                            </p>
                            <p style="margin: 10px 0;">
                                <strong style="color: #555;">Email:</strong> 
                                <a href="mailto:{email}" style="color: #06b6d4;">{email}</a>
                            </p>
                            <p style="margin: 10px 0;">
                                <strong style="color: #555;">Subject:</strong> {subject}
                            </p>
                        </div>
                        
                        <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #06b6d4; border-radius: 4px;">
                            <strong style="color: #555;">Message:</strong>
                            <p style="margin-top: 10px; white-space: pre-wrap;">{message}</p>
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #888; font-size: 12px;">
                            <p>This email was sent from your portfolio website contact form.</p>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            text_body = f"""
New Contact Form Submission

From: {name}
Email: {email}
Subject: {subject}

Message:
{message}

---
This email was sent from your portfolio website contact form.
            """
            
            # Attach both plain text and HTML versions
            part1 = MIMEText(text_body, 'plain')
            part2 = MIMEText(html_body, 'html')
            msg.attach(part1)
            msg.attach(part2)
            
            # Send email
            if not self.smtp_user or not self.smtp_password:
                logger.warning("SMTP credentials not configured, email not sent")
                return {
                    'success': False,
                    'message': 'Email service not configured. Please contact directly via email.',
                    'mock': True
                }
            
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(msg)
            
            logger.info(f"Contact email sent successfully from {email}")
            return {
                'success': True,
                'message': 'Email sent successfully! I\'ll get back to you soon.'
            }
            
        except smtplib.SMTPException as e:
            logger.error(f"SMTP error sending email: {str(e)}")
            return {
                'success': False,
                'message': 'Failed to send email. Please try again or contact directly.'
            }
        except Exception as e:
            logger.error(f"Unexpected error sending email: {str(e)}")
            return {
                'success': False,
                'message': 'An error occurred. Please contact directly via email.'
            }

# Create singleton instance
email_service = EmailService()
