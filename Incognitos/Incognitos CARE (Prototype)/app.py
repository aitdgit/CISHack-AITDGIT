import os
import json
from flask import Flask, request, make_response, jsonify
import googleapiclient.discovery
from google.oauth2 import service_account

app = Flask(__name__)


def respond(fullfilment):
    return make_response(jsonify({"fulfillmentText": fullfilment}))


def get_credentials():
    scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
    GOOGLE_PRIVATE_KEY = os.environ["GOOGLE_PRIVATE_KEY"]
    GOOGLE_PRIVATE_KEY = GOOGLE_PRIVATE_KEY.replace("\\n", "\n")

    account_info = {
        "private_key": GOOGLE_PRIVATE_KEY,
        "client_email": os.environ["GOOGLE_CLIENT_EMAIL"],
        "token_uri": "https://accounts.google.com/o/oauth2/token",
    }

    credentials = service_account.Credentials.from_service_account_info(
        account_info, scopes=scopes
    )
    return credentials


def get_service(service_name="sheets", api_version="v4"):
    credentials = get_credentials()
    service = googleapiclient.discovery.build(
        service_name, api_version, credentials=credentials
    )
    return service


def search_service(center_type):
    t_comp, t_name, t_phone, t_sp_result, t_result = "", "", "", "", []
    
    req = request.get_json(silent=True, force=True)
    query_result = req.get("queryResult")
    # print(json.dumps(req))
    
    service = get_service()
    spreadsheet_id = os.environ["GOOGLE_SPREADSHEET_ID"]

    result = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=spreadsheet_id, range=center_type)
        .execute()
    )

    values = result.get("values", [])

    for loc in values:
        t_comp = loc[1]
        t_comp = t_comp.strip()
        if t_comp == query_result.get("parameters").get("geo-city"):
            t_name = loc[0]
            t_phone = loc[2]
            t_result.append(str(t_name + " " + t_phone))

        if len(t_result) == 0:
            t_sp_result = "No results in the database for the area you entered"
        else:
            t_sp_result = "\n".join(map(str, t_result))

    return t_sp_result


@app.route("/medassist", methods=["POST"])
def medical_assistant_handler():
    meds, temp1, temp2, temp3, temp4 = 0 , '', '', '', ''

    try:
        req = request.get_json(silent=True, force=True)
        query_result = req.get("queryResult")
        # print(json.dumps(req))

        if query_result.get("intent").get("displayName") == "user_status":
            return respond("Welcome to CARE!")
        elif query_result.get("intent").get("displayName") == "refill":
            return respond("Enter phc/uhc/chc/pharmacy at beginning followed by area")
        elif query_result.get("intent").get("displayName") == "phc":
            temp1 = search_service("phc!A4:C26")
            return respond(temp1)
        elif query_result.get("intent").get("displayName") == "uhc":
            temp2 = search_service("uhc!A3:C6")
            return respond(temp2)
        elif query_result.get("intent").get("displayName") == "chc":
            temp3 = search_service("chc!A3:C30")
            return respond(temp3)
        elif query_result.get("intent").get("displayName") == "pharma":
            temp4 = search_service("pharma!A3:C35")
            return respond(temp4)
        elif query_result.get("intent").get("displayName") == "check":
            if meds == 0:
                return respond("You still have not taken your medication")
            else:
                return respond(
                    "Looks like you've taken all your medication for the day"
                )
        elif query_result.get("intent").get("displayName") == "checkin":
            return respond("Check in time! Did you take your medication today?")
        elif query_result.get("intent").get("displayName") == "checkinyes":
            return respond("Awesome! Marking down as complete")
            meds = 1
        elif query_result.get("intent").get("displayName") == "checkinno":
            return respond("You need to take your medication daily, please do so soon")
        elif query_result.get("intent").get("displayName") == "reset":
            return respond("Reset complete")
        elif query_result.get("intent").get("displayName") == "fallback":
            return respond("I didn't get you. Please say hi to start chat again!")
        else:
            return respond("Error occurred!")
    except Exception as e:
        print(e)
        return respond("Sorry, an error occurred. Please check the server logs.")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
