

-- 1 
SELECT L.ФАМИЛИЯ,
       S.ДАТА
FROM Н_ЛЮДИ L
RIGHT JOIN Н_СЕССИЯ S
       ON L.ИД = S.ЧЛВК_ИД  
WHERE L.ИМЯ > 'Ярослав'
  AND S.ИД > 32199
  AND S.ИД < 14;


-- 2
SELECT L.ФАМИЛИЯ,
       O.ЧЛВК_ИД,
       U.ИД
FROM Н_ЛЮДИ L
INNER JOIN Н_ОБУЧЕНИЯ O
    ON L.ИД = O.ЧЛВК_ИД
INNER JOIN Н_УЧЕНИКИ U
    ON O.ВИД_ОБУЧ_ИД = U.ВИД_ОБУЧ_ИД
WHERE L.ФАМИЛИЯ = 'Афанасьев'
  AND O.НЗК::integer > 933232;


-- 3
  SELECT COUNT(*) AS Количество_студентов
FROM Н_ЛЮДИ L
JOIN Н_УЧЕНИКИ U
  ON L.ИД = U.ЧЛВК_ИД
JOIN Н_ПЛАНЫ PL
  ON U.ПЛАН_ИД = PL.ИД
JOIN Н_ОТДЕЛЫ V
  ON PL.ОТД_ИД::integer = V.ИД
WHERE V.КОРОТКОЕ_ИМЯ = 'КТиУ'
  AND date_part('year', age(current_date, L.ДАТА_РОЖДЕНИЯ)) > 25;

  --4 
  SELECT g.ГРУППА
FROM Н_УЧЕНИКИ s
JOIN Н_ГРУППЫ_ПЛАНОВ g ON g.ГРУППА = s.ГРУППА
JOIN Н_ПЛАНЫ PL ON s.ПЛАН_ИД = PL.ИД
JOIN Н_ОТДЕЛЫ V ON PL.ОТД_ИД = V.ИД
WHERE EXTRACT(YEAR FROM s.НАЧАЛО) = 2011
  AND V.КОРОТКОЕ_ИМЯ = 'ВТ'
GROUP BY g.ГРУППА
HAVING COUNT(s.	ЧЛВК_ИД) > 5;

--5

WITH max_age_1100 AS (
  SELECT MAX(date_part('year', age(CURRENT_DATE, l2.ДАТА_РОЖДЕНИЯ))) AS max_age
  FROM Н_УЧЕНИКИ s2
  JOIN Н_ЛЮДИ l2 ON s2.ЧЛВК_ИД = l2.ИД
  WHERE s2.ГРУППА = '1100'
)
SELECT
  s.ГРУППА AS "Группа",
  AVG(date_part('year', age(CURRENT_DATE, l.ДАТА_РОЖДЕНИЯ))) AS "Средний возраст"
FROM Н_УЧЕНИКИ s
JOIN Н_ЛЮДИ   l ON s.ЧЛВК_ИД = l.ИД
GROUP BY s.ГРУППА
HAVING 
  AVG(date_part('year', age(CURRENT_DATE, l.ДАТА_РОЖДЕНИЯ)))
  < (SELECT max_age FROM max_age_1100);

SELECT 
  s.ГРУППА AS "Группа",
  AVG(date_part('year', age(CURRENT_DATE, l.ДАТА_РОЖДЕНИЯ))) AS "Средний возраст"
FROM Н_УЧЕНИКИ s
JOIN Н_ЛЮДИ l ON s.ЧЛВК_ИД = l.ИД
GROUP BY s.ГРУППА
HAVING AVG(date_part('year', age(CURRENT_DATE, l.ДАТА_РОЖДЕНИЯ))) < (
    SELECT MAX(date_part('year', age(CURRENT_DATE, l2.ДАТА_РОЖДЕНИЯ)))
    FROM Н_УЧЕНИКИ s2
    JOIN Н_ЛЮДИ l2 ON s2.ЧЛВК_ИД = l2.ИД
    WHERE s2.ГРУППА = '1100'
);

-- 6

SELECT 
    g.ГРУППА,
    l.ИД AS НОМЕР_СТУДЕНТА,
    l.ФАМИЛИЯ,
    l.ИМЯ,
    l.ОТЧЕСТВО,
    v.НОМЕР_ДОКУМЕНТА AS НОМЕР_ПУНКТА_ПРИКАЗА
FROM Н_УЧЕНИКИ u
JOIN Н_ЛЮДИ l ON l.ИД = u.ЧЛВК_ИД
JOIN Н_ГРУППЫ_ПЛАНОВ g ON g.ГРУППА = u.ГРУППА
JOIN Н_ВЕДОМОСТИ v ON v.НОМЕР_ДОКУМЕНТА = u.В_СВЯЗИ_С::varchar
JOIN Н_ФОРМЫ_ОБУЧЕНИЯ fo ON fo.ИД = u.ВИД_ОБУЧ_ИД
WHERE u.ПРИЗНАК = 'отчисл'
  AND u.КОНЕЦ_ПО_ПРИКАЗУ > DATE '2012-09-01'
  AND fo.НАИМЕНОВАНИЕ = 'Очная';
 


-- 7 
SELECT l.*
FROM Н_ЛЮДИ l
JOIN (
  SELECT ФАМИЛИЯ
  FROM Н_ЛЮДИ
  GROUP BY ФАМИЛИЯ
  HAVING COUNT(DISTINCT ДАТА_РОЖДЕНИЯ) > 1
) dup ON l.ФАМИЛИЯ = dup.ФАМИЛИЯ;





  