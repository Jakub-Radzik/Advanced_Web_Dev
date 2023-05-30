import os
import smtplib
import fastapi
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from src.apps.services.generate_pdf import generate_pdf
from src.settings import settings



def send_email_with_pdf(recipient_email: str, data):
    REQUEST_ATTEMPTS = 5

    # Generate PDF
    output_file, response_code, qrstring = generate_pdf(data)
    # if PDF was not generated correctly, return 400 error
    if response_code != fastapi.status.HTTP_200_OK:
        return fastapi.status.HTTP_412_PRECONDITION_FAILED

    # Prepare mailtrap credentials and PDF file path
    output_file = f"../tmp/" + output_file
    username = settings.EMAIL_USERNAME
    password = settings.EMAIL_PASSWORD

    # Prepare email message
    email_sender = settings.EMAIL_FROM
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

if __name__ == '__main__':
    data = {
  "screening_date": "2021-09-30",
  "screening_title": "Władca Pierścieni: Dwie wieże",
  "screening_hour": "19:15",
  "screening_room": "Sala 6",
  "cinema": "Wroclaw Pasaż",
  "qrstring": "",
  "ticket_number": "WRJBH56",
  "transaction_number": "DXmww3Vq54QBMBQn",
  "items": [
    {
      "ticket_type": "Ulgowy",
      "seat": "F-43",
      "unit_price": 22.5
    },
    {
      "ticket_type": "Normalny",
      "seat": "A-43",
      "unit_price": 33.50
    }
  ]
}
    send_email_with_pdf("grygorukpp@gmail.com", data)