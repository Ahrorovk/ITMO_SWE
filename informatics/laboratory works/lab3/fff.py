#465722%2 ->: 2 вариант найти 'ВТ <4 слов ИТМО')
import json
import re
# def count_smiles(string):
#     if string == '-1':
#         return '-1'
#     return re.findall(r'ВТ *\W*\w{0,}\W* *\W*\w{0,}\W* *\W*\w{0,}\W* *\W*\w{0,}\W* ИТМО',string)
# print('Для выхода из программы введите: -1')
# while(True):
#     flag = count_smiles(input('Введите строку для поиска в ней фрагментов вида ВТ <4 слов ИТМО :'))
#     if flag == '-1':
#         break
#     print(flag)

#[ ?] - пробел есть или нет
#[\W*] - cколь угодно много символов отличных от тех, что содержаться в словах p.s (. , : ^ - etc..)
#[\w{0,}] - слово из скольки угодно символов
#[\W*] - cколь угодно много символов отличных от тех, что содержаться в словах p.s (. , : ^ - etc..)
k = []
# [-\w]
# [^-\w]
my_json = {}
my_answers = ['']
string = input("введите ваше сообщение: ")
k.extend(re.findall(r'\bВТ\b \bИТМО\b', string))
k.extend(re.findall(r'\bВТ\b +[^-\w]*[-\w]{0,}[^-\w]* \bИТМО\b', string))
k.extend(re.findall(r'\bВТ\b +[^-\w]*[-\w]{1,}[^-\w]* +[^-\w]*[-\w]{1,}[^-\w]* \bИТМО\b', string))
k.extend(re.findall(r'ВТ +[^-\w]*[-\w]{1,}[^-\w]* +[^-\w]*[-\w]{1,}[^-\w]* +[^-\w]*[-\w]{1,}[^-\w]* \bИТМО\b', string))
k.extend(re.findall(r'\bВТ\b +[^-\w]*[-\w]{1,}[^-\w]* +[^-\w]*[-\w]{1,}[^-\w]* +[^-\w]*[-\w]{1,}[^-\w]* +[^-\w]*[-\w]{1,}[^-\w]* \bИТМО\b', string))

if len(k) != 0:
    my_answers = k
my_json["answers"] = my_answers
for i in k:
    print(i)

with open('result.json', 'w', encoding="utf-8") as file:
    dumped_json = json.dumps(my_json, ensure_ascii=False)
    file.write(dumped_json)
