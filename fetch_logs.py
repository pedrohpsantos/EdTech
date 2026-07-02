import urllib.request
import urllib.parse
import json
import time
import subprocess

try:
    with open(r'C:\Users\pedrohpsantos\Documents\EdTech\infra\gcp-credentials.json', 'r') as f:
        creds = json.load(f)
    
    import jwt
    now = int(time.time())
    payload = {
        'iss': creds['client_email'],
        'scope': 'https://www.googleapis.com/auth/logging.read',
        'aud': creds['token_uri'],
        'iat': now,
        'exp': now + 3600
    }
    encoded = jwt.encode(payload, creds['private_key'], algorithm='RS256')
    
    data = urllib.parse.urlencode({
        'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion': encoded
    }).encode('utf-8')
    
    req = urllib.request.Request(creds['token_uri'], data=data, method='POST')
    with urllib.request.urlopen(req) as response:
        token = json.loads(response.read())['access_token']
        print('Got token. Fetching logs...')

    req = urllib.request.Request(
        'https://logging.googleapis.com/v2/entries:list',
        data=json.dumps({
            'resourceNames': ['projects/edtech-storage-501117'],
            'filter': 'resource.type="cloud_run_revision" AND resource.labels.service_name="edtech-backend"',
            'orderBy': 'timestamp desc',
            'pageSize': 150
        }).encode('utf-8'),
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        },
        method='POST'
    )

    with urllib.request.urlopen(req) as response:
        logs = json.loads(response.read())
        for entry in logs.get('entries', []):
            print(f"[{entry.get('timestamp')}] {entry.get('textPayload', entry.get('jsonPayload', ''))}")
except Exception as e:
    print("Error:", e)
