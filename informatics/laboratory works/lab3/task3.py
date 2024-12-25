import re
import json

js = {}
answers = ['']
def replace_adjectives(case_index, text):
    adjective_pattern = r'\b(\w+ный|\w+ная|\w+ное|\w+ные)\b'
    adjectives = re.findall(adjective_pattern, text)

    if not adjectives:
        return text

    count = {}
    for adj in adjectives:
        count[adj] = count.get(adj, 0) + 1

    case_forms = {
        'И': ['ый', 'ая', 'ое', 'ые'],  
        'Р': ['ого', 'ой', 'ого', 'ых'], 
        'Д': ['ому', 'ой', 'ому', 'ым'], 
        'В': ['ый', 'ую', 'ое', 'ые'],  
        'Т': ['ым', 'ой', 'ым', 'ыми'], 
        'П': ['ом', 'ой', 'ом', 'ых'],  
    }

    def replace(match):
        adj = match.group(0)
        if count[adj] > 1:  
            index = case_index - 1  
            form = case_forms['Р'][0] if index == 1 else case_forms['И'][0]
            return adj[:-2] + form  
    
        return adj

    modified_text = re.sub(adjective_pattern, replace, text)
    return modified_text

case_num = int(input("number: "))
text_input = input("Text: ")

result = replace_adjectives(case_num, text_input)
if len(result) != 0:
    answers = result
js["answers"] = answers
with open('result.json', 'w', encoding="utf-8") as file:
    dJson = json.dumps(js, ensure_ascii=False)
    file.write(dJson)
                                 
