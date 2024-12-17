import re

def find_vt_itmo(text):
    pattern1 = r"\bВТ\b\s*\bИТМО\b"
    pattern2 = r"\bВТ\b(?:\s+\S+?){0,4}\s+ИТМО\b"
    
    matches = []
    matches.extend(re.findall(pattern1,text))
    matches.extend(re.findall(pattern2,text))
    return matches

# Пример использования
text = "ВТ ВТ ИТМО"
result = find_vt_itmo(text)
for match in result:
    print(match)
