import json

# load history
with open('history.json', 'r') as file:
    history = json.load(file)

# load data
with open('data.json', 'r') as file:
    data = json.load(file)

# load names
with open('names.json', 'r') as file:
    names = json.load(file)

content = {
    
}
for isin in history.keys():
    if isin not in data or isin not in names:
        continue
    content[isin] = data[isin]
    content[isin]['ISIN'] = isin
    content[isin]['shortName'] = names[isin]
    content[isin]['prices'] = history[isin]['values']


cres = {
    'dates': next(iter(history.values()))['dates'],
    'data': content
}

with open('final_final.json', 'w') as file:
    json.dump(cres, file, indent=2)
