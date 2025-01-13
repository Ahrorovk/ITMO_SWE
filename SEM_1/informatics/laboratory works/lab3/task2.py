import json
import re
js = {}
answers = ['']
string = input("Сообщение: ")

def find_vt_itmo(text):
    pattern1 = r"\bВТ\b\s*\bИТМО\b"
    pattern2 = r"\bВТ\b(?:\s+\S+?){0,4}\s+ИТМО\b"
    
    matches = []
    matches.extend(re.findall(pattern1,text))
    matches.extend(re.findall(pattern2,text)) 
    
    return matches

result = list(set(find_vt_itmo(string)))
for match in result:
    print(match)

if len(result) != 0:
    answers = result
js["answers"] = answers

with open('result.json', 'w', encoding="utf-8") as file:
    dJson = json.dumps(js, ensure_ascii=False)
    file.write(dJson)
