import uuid

import requests
import json


def generate_pdf(data):
    qrstring = str(uuid.uuid1())
    api_key = "6858NDU2MTo0NTc0OnJNd3VFekpqaDZWTGhjQ0Q"
    template_id = "ddc77b23784dcdbc"
    url = "https://api.craftmypdf.com/v1/create"
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

    response = requests.post(url, headers=headers, json=json_payload)
    if response.status_code == 200:
        with open(output_file, "wb") as file:
            file.write(response.content)
        # print(f"PDF downloaded to: {output_file}")
    # else:
        # print(f"Error downloading PDF: {response.text}")

    return output_file, response.status_code

"""
    my_data = {
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
"""
