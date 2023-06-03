import uuid
import requests
import json
import fastapi
from src.settings import settings


def generate_pdf(data):
    REQUEST_ATTEMPTS = 5
    qrstring = data["qrstring"]
    api_key = settings.PDF_KEY
    template_id = settings.PDF_TEMPLATE_ID
    url = settings.PDF_URL
    output_file = f"../tmp/{qrstring}'" + ".pdf"

    json_payload = {
        "data": json.dumps(data),
        "output_file": "output.pdf",
        "export_type": "file",
        "expiration": 10,
        "template_id": template_id,
        "direct_download": 1
    }

    headers = {"X-API-KEY": api_key}

    for _ in range(REQUEST_ATTEMPTS):
        response = requests.post(url, headers=headers, json=json_payload)
        if response.status_code == fastapi.status.HTTP_200_OK:
            with open(output_file, "wb") as file:
                file.write(response.content)
            return output_file, response.status_code

    # if request was not successfull
    return "", response.status_code
