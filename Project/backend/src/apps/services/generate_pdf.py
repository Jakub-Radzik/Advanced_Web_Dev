import uuid
import requests
import json
import os
from dotenv import load_dotenv
import fastapi


def generate_pdf(data):
    REQUEST_ATTEMPTS = 5
    load_dotenv()
    qrstring = str(uuid.uuid1())
    api_key = os.getenv("PDF_KEY")
    template_id = os.getenv("PDF_TEMPLATE_ID")
    url = os.getenv("PDF_URL")
    output_file = f"../tmp/{qrstring}'" + ".pdf"

    data["qrstring"] = qrstring

    json_payload = {
        "data": json.dumps(data),
        "output_file": "output.pdf",
        "export_type": "file",
        "expiration": 10,
        "template_id": template_id,
        "direct_download": 1
    }

    headers = {"X-API-KEY": api_key}

    response = None
    for _ in range(REQUEST_ATTEMPTS):
        response = requests.post(url, headers=headers, json=json_payload)
        if response.status_code == fastapi.status.HTTP_200_OK:
            with open(output_file, "wb") as file:
                file.write(response.content)
            return output_file, response.status_code, qrstring

    # if request was not successfull
    return None, response.status_code, qrstring
