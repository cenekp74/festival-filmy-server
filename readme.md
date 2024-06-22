Server pro system na automaticke spousteni filmu na filmovem festivalu na GEKOMu pro rok 2024

# Poznamky
- aplikace by mela bezet jenom s jednim wsgi workerem (apf.ini processes=1), protoze uklada clienty a logy do promenne app, ktera se nesyncuje mezi workerama