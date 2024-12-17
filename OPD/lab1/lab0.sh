#!/bin/bash                                                                                                                                                                                                                                     # Дерева каталогов и файлов                                                                                                                                                                                                                     # Дерево каталогов                                                                                                      mkdir -p feraligatr4/exeggcute                                                                                          mkdir -p feraligatr4/frillish                                                                                           mkdir -p floatzel7/tyranitar                                                                                            mkdir -p floatzel7/joltik                                                                                               mkdir -p swablu5/shellder                                                                                               mkdir -p swablu5/whirlpede                                                                                              mkdir -p swablu5/scizor                                                                                                 mkdir -p swablu5/beheeyem                                                                                                                                                                                                                       # Файлы                                                                                                                 touch feraligatr4/blitzle                                                                                               touch feraligatr4/claydol                                                                                               touch feraligatr4/shiftry                                                                                               touch feraligatr4/hypno                                                                                                 touch floatzel7/shinx                                                                                                   touch hariyama6                                                                                                         touch seedot1                                                                                                           touch swablu5/tepig                                                                                                     touch swablu5/totodile                                                                                                  touch torterra0                

# Содержимое файлов
echo "Тип покемона ELECTRIC NONE" > feraligatr4/blitzle
echo -e "weigth=238.1 height=59.0\natk=7 def=11" > feraligatr4/claydol
echo -e "Возможности Overland=8 Surface=6 Jump=4 Power=4\nIntelligence=4" > feraligatr4/shiftry
echo -e "Возможности Overland=8 Surface=5 Jump=3 Power=3\nIntelligence=5 Dream Smoke=0 Mind Lock=0" > feraligatr4/hypno
echo "Ходы Fury Cutter Iron Tail Magnet Rise Mud-Slap Signal Beam Sleep Talk Snore Swift" > floatzel7/shinx
echo -e "Возможности Overland=7 Surface=7 Jump=1 Power=6\nIntelligence=4 Aura=0" > hariyama6
echo "weigth=8.8 height=20.0 atk=4\ndef=5" > feraligatr4/seedot1
echo "Ходы Covet Endeavor Fire Pledge Heat Wave Helping Hand Iron Tail Sleep Talk Snore Superpower" > swablu5/tepig
echo "Ходы Ancientpower Aqua Tail Block Body Slam Counter Dive Double-Edge Dynamicpunch Focus\nPunch Ice Punch Icy Wind ">
echo "weigth=683.4 height=87.0 atk=11 def=11" > torterra0
# Права

chmod 770 feraligatr4/exeggcute
chmod 444 feraligatr4/blitzle
chmod 640 feraligatr4/claydol
chmod 400 feraligatr4/shiftry
chmod 004 feraligatr4/hypno
chmod 770 feraligatr4/frillish
chmod 317 floatzel7
chmod 764 floatzel7/tyranitar
chmod 604 floatzel7/shinx
chmod 511 swablu5
chmod 700 swablu5/scizor
chmod 570 swablu5/whirlpede
chmod 511 swablu5/shellder
chmod 400 swablu5/tepig
chmod 444 seedot1
chmod 700 floatzel7/joltik
chmod 777 torterra0

# Ссылки

#1 cоздать жесткую ссылку для файла torterra0 с именем feraligatr4/hypnotorterra
ln torterra0 feraligatr4/hypnotorterra
cat feraligatr4/hypnotorterra

#2 объеденить содержимое файлов feraligatr4/claydol, feraligatr4/hypno, в новый файл seedot1_48
cat feraligatr4/claydol feraligatr4/hypno > seedot1_48

#3 скопировать содержимое файла torterra0 в новый файл swablu5/totodiletorterra
cp torterra0 swablu5/totodiletorterra

#4 cоздать символическую ссылку для файла torterra0 с именем feraligatr4/shiftrytorterra
ln -s torterra0 feraligatr4/shiftrytorterra

#5 создать символическую ссылку c именем Copy_31 на директорию floatzel7
ln -s floatzel7 Copy_31

#6 скопировать рекурсивно директорию floatzel7 в директорию swablu5/scizor
cp -r floatzel7 swablu5/scizor

#7 скопировать файл seedot1 в директорию lab0/feraligatr4/exeggcute
cp seedot1 feraligatr4/exeggcute

# Поиск и фильтрация файлов
echo "SORT_1"
#1 Рекурсивно подсчитать количество символов содержимого файлов из директории lab0, имя которых начинается на 'b', отсо>ls -d b* */b* 2>/tmp/errors.log | sort -nr
echo "SORT_2"
#2 Вывести рекурсивно список имен и атрибутов файлов в директории feraligatr4, список отсортировать по возрастанию даты>ls -lR --time=atime --sort=time feraligatr4 2>/dev/null

echo "SORT_3"
#3 Вывести содержимое файла hariyama6, оставить только строки, содержащие "mp", добавить вывод ошибок доступа в стандар>grep "mp" hariyama6 2>&1

echo "SORT_4"
#4 Вывести три первых элемента рекурсивного списка имен и атрибутов файлов в директории lab0, начинающихся на символ 'h>ls -ld h* */h* 2>&1 | sort -k5,5nr | head -n 3

echo "SORT_5"
#5 Вывести содержимое файлов: blitzle, claydol, shiftry, hypno, shinx, исключить строки, содержащие "Ta", регистр симво>cat feraligatr4/blitzle feraligatr4/claydol feraligatr4/shiftry feraligatr4/hypno floatzel7/shinx 2>/tmp/errors.log | g>

echo "SORT_6"
#6 Вывести два первых элемента рекурсивного списка имен и атрибутов файлов в директории lab0, заканчивающихся на символ>
ls -ld *r */*r 2>/tmp/errors.log | sort -k5,5n | head -n 2

#Удаление файлов и каталогов
rm torterra0
rm feraligatr4/claydol
rm feraligatr4/shiftrytorter*
rm feraligatr4/hypnotorter*
rm -r feraligatr4
rm -r feraligatr4/frilish