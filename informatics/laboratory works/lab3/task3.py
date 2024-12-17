import re
from collections import Counter

def change_case(text, word_number):
    adjective_pattern = r'\b[А-Яа-яёЁ]+(?:ый|ий|ой|ого|его|ому|ему|ым|им|ом|ем|ая|яя|ой|ей|ую|юю|ое|ее|ые|ие|ых|их|ым|им)\b'
    
    adjective_arr = ["ый","ий","ой","ого","его","ому","ему","ым","им","ом","ем","ая","яя","ой","ей","ую","юю","ое","ее","ые","ие","ых","их","ым","им"]
    adjectives = re.findall(adjective_pattern, text)

    normalized_adjectives = []
    for adj in adjectives:
        for arr in adjective_arr:
            if arr in adj:
                normalized_adjectives.append(adj.replace(arr,""))
                break
    print(normalized_adjectives)
    adjective_counts = Counter(normalized_adjectives)
    i = 0
    for item,count in adjective_counts.items():
        new_key = adjectives[i]
        adjective_counts[new_key]=adjective_counts[item]
        del adjective_counts[item]
        i+=1
    if len(adjectives) < word_number:
        return "Недостаточно прилагательных в тексте для выполнения замены."
    
    # Найдем прилагательные, которые встречаются более одного раза
    repeated_adjectives = [adj for adj, count in adjective_counts.items() if count > 1]
    target_adjective = repeated_adjectives[word_number - 1]
    def replace_adjective(match):
        adjective = match.group()
        if adjective in repeated_adjectives:
            return target_adjective  # Заменяем только прилагательные, которые повторяются
        return adjective  # Оставляем остальные без изменений

    result_text = re.sub(adjective_pattern, replace_adjective, text)
    
    return result_text

# Пример использования
text = """Футбольный клуб «Реал Мадрид» является 15-кратным обладателем главного футбольного европейского трофея – Лиги Чемпионов. Данный турнир организован Союзом европейских футбольных ассоциаций (УЕФА). Идея о континентальном футбольном турнире пришла к журналисту Габриэлю Ано в 1955 году."""

# Указываем номер прилагательного для замены
word_number = 2

result = change_case(text, word_number)
print(result)
