Server pro system na automaticke spousteni filmu na filmovem festivalu na GEKOMu pro rok 2024

# Poznamky
- aplikace by mela bezet jenom s jednim wsgi workerem (apf.ini processes=1), protoze uklada clienty a logy do promenne app, ktera se nesyncuje mezi workerama
### prehravani spotu
- kdyz fetchuju program ze serveru, automaticky se pro kazdou tridu pro kazdy den prida soubor spotu na zacatek (definovany v `__init__.py`)
- soubor se prida na 8:30, takze dalsi film se vzdy spusti se zpozdenim