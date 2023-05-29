import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

import fastapi

from src.apps.services.generate_pdf import generate_pdf
from dotenv import load_dotenv


def send_email_with_pdf(recipient_email: str, data):
    REQUEST_ATTEMPTS = 5
    load_dotenv()

    # Generate PDF
    output_file, response_code, qrstring = generate_pdf(data)
    # if PDF was not generated correctly, return 400 error
    if response_code != fastapi.status.HTTP_200_OK:
        return fastapi.status.HTTP_412_PRECONDITION_FAILED

    # Prepare mailtrap credentials and PDF file path
    output_file = f"../tmp/" + output_file
    username = os.getenv("EMAIL_USERNAME")
    password = os.getenv("EMAIL_PASSWORD")

    # Prepare email message
    email_sender = os.getenv("EMAIL_FROM")
    email_subject = "Dziękujemy za zakup biletu"

    message = MIMEMultipart()
    message["From"] = email_sender
    message["To"] = recipient_email
    message["Subject"] = email_subject

    # Email body
    email_body = """
        Drogi Kliencie,
        
        Dziękujemy za zakup biletu w naszym kinie,
        znajdziesz go w załączniku.
        """
    message.attach(MIMEText(email_body, "plain"))

    # Attachment
    attachment = open(output_file, "rb")

    part = MIMEBase("application", "octet-stream")
    part.set_payload(attachment.read())
    encoders.encode_base64(part)
    part.add_header("Content-Disposition", f"attachment; filename= {output_file}")
    message.attach(part)

    # Send email using Mailtrap
    for _ in range(REQUEST_ATTEMPTS):
        try:
            with smtplib.SMTP("live.smtp.mailtrap.io", 587) as server:
                server.ehlo()
                server.starttls()
                server.ehlo()
                server.login(username, password)
                server.sendmail(email_sender, recipient_email, message.as_string())
            attachment.close()
            os.remove(output_file)
            return fastapi.status.HTTP_200_OK, data["qrstring"]
        except Exception as e:
            return fastapi.status.HTTP_400_BAD_REQUEST, None