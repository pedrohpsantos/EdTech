import urllib.request
import json

token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvcmllbnRhZG9yLmRlbW9AdW5iLmJyIiwidWlkIjoiZmY4MDk1ODgtY2IxOC00NWM1LWEyMDctZTMwNGUyNTM0MDk3Iiwicm9sZSI6IkFEVklTT1IiLCJpYXQiOjE3ODM4MzE2ODksImV4cCI6MTc4MzgzNTI4OX0.m8kPjPnuo8YBh46dzYo0YTzPb1yTtgWVkTfcJD6BtJ4'

def test_endpoint(endpoint):
    url = f'https://edtech-backend-shv6qbpf4q-rj.a.run.app{endpoint}'
    req = urllib.request.Request(url, method='GET')
    req.add_header('Authorization', f'Bearer {token}')
    req.add_header('Accept', 'application/json')
    try:
        with urllib.request.urlopen(req) as response:
            print(f"{endpoint} Status: {response.status}")
            print(response.read().decode('utf-8')[:500])
    except urllib.error.HTTPError as e:
        print(f'{endpoint} HTTP Error: {e.code} {e.reason}')
        print(e.read().decode('utf-8'))
    except Exception as e:
        print(f'{endpoint} Error: {e}')

test_endpoint('/api/dashboard/stats')
test_endpoint('/api/documents')
