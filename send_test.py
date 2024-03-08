import requests

for room in ["II","V","VII","VIII","IIII","III","VI","IV","I"]:
    requests.post(f'http://127.0.0.1:9864/client/{room}/msg', data='Starting')
    requests.post(f'http://127.0.0.1:9864/client/{room}/msg', data='Downloading content')
    requests.post(f'http://127.0.0.1:9864/client/{room}/msg', data='Waiting for time')
    for _ in range(60):
        requests.post(f'http://127.0.0.1:9864/client/{room}/msg', data='Playing film')