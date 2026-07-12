import urllib.request

url = 'https://edtech-backend-shv6qbpf4q-rj.a.run.app/api/auth/login'
req = urllib.request.Request(url, method='OPTIONS')
req.add_header('Origin', 'https://edtech-storage-501117.web.app')
req.add_header('Access-Control-Request-Method', 'POST')
req.add_header('Access-Control-Request-Headers', 'content-type, x-request-id, authorization')

try:
    with urllib.request.urlopen(req) as response:
        print(f"Status: {response.status}")
        print("Headers:")
        for k, v in response.headers.items():
            if 'access-control' in k.lower():
                print(f"{k}: {v}")
except urllib.error.HTTPError as e:
    print(f'HTTP Error: {e.code} {e.reason}')
except Exception as e:
    print(f'Error: {e}')
