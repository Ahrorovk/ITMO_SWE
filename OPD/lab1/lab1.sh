#!/bin/bash
top -d 180 -s 1 | grep $1 > stat.txt
cat stat.txt > stat_b.txt
awk '{print $7}' stat_b.txt > virt.txt
awk '{print $6}' stat_b.txt > mem.txt
awk '{print $11}' stat_b.txt > cpu.txt