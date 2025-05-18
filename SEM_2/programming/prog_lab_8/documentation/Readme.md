# LabWorks REST API

API для управления лабораторными работами и пользователями.

**Базовый URL:**
`http://eren24r.ru:8090`

---

## 🏁 Быстрый старт

### Регистрация

```http
POST /api/sign-up
Content-Type: application/json

{
  "login": "new_login",
  "password": "new_password"
}
```

**Ответ:**

```json
{ "token": "..." }
```

---

### Авторизация

```http
POST /api/login
Content-Type: application/json

{
  "login": "your_login",
  "password": "your_password"
}
```

**Ответ:**

```json
{ "token": "..." }
```

Используйте токен для всех запросов, требующих авторизации:

```
-H "Authorization: <token>"
```

---

## 🧪 Методы LabWorks

### Добавить лабораторную работу

```http
POST /api/lab-works/add
Content-Type: application/json
Authorization: <token>

{
  "name": "Lab #1",
  "coordinates": { "x": 1, "y": 2 },
  "minimalPoint": 3.5,
  "maximumPoint": 10,
  "personalQualitiesMaximum": 5,
  "difficulty": "NORMAL",
  "discipline": { "name": "Math", "practiceHours": 12 },
  "creationDate": "2025-05-18"
}
```

---

### Добавить если значение максимальное

```http
POST /api/lab-works/add-if-max
Content-Type: application/json
Authorization: <token>

{
  // структура аналогична добавлению LabWork
}
```

---

### Показать все работы пользователя

```http
GET /api/lab-works/show
Authorization: <token>
```

---

### Получить информацию о коллекции

```http
GET /api/lab-works/info
Authorization: <token>
```

---

### Очистить коллекцию пользователя

```http
GET /api/lab-works/clear
Authorization: <token>
```

---

### Обновить лабораторную работу

```http
POST /api/lab-works/update
Content-Type: application/json
Authorization: <token>

{
  "id": 3,
  "labWork": {
    "name": "Updated name",
    "coordinates": { "x": 5, "y": 10 },
    "minimalPoint": 4.0,
    "maximumPoint": 9,
    "personalQualitiesMaximum": 10,
    "difficulty": "NORMAL",
    "discipline": { "name": "Physics", "practiceHours": 22 },
    "creationDate": "2025-05-19"
  }
}
```

---

### Удалить работу по id

```http
POST /api/lab-works/remove-by-id
Content-Type: application/json
Authorization: <token>

3 // id (число)
```

---

### Удалить работы больше заданного

```http
POST /api/lab-works/remove-greater
Authorization: <token>
```

---

### Удалить работы меньше заданного

```http
POST /api/lab-works/remove-lower
Authorization: <token>
```

---

### Перемешать коллекцию пользователя

```http
POST /api/lab-works/reorder
Authorization: <token>
```

---

### Вывести уникальные дисциплины

```http
GET /api/lab-works/print-unique-discipline
Authorization: <token>
```

---

### Получить работу с минимальным maximumPoint

```http
GET /api/lab-works/min-by-maximum-point
Authorization: <token>
```

---

### Фильтрация: работы с большей сложностью

```http
GET /api/lab-works/filter-greater-difficulty
Content-Type: application/json
Authorization: <token>

{
  "difficulty": "EASY"
}
```

---

## 📦 Форматы данных

### LabWork

```json
{
    "name": "string",
    "coordinates": { "x": long, "y": long },
    "minimalPoint": double,
    "maximumPoint": int,
    "personalQualitiesMaximum": int,
    "difficulty": "VERY_EASY" | "EASY" | "NORMAL" | "TERRIBLE",
    "discipline": { "name": "string", "practiceHours": int },
    "creationDate": "yyyy-mm-dd"
}
```

---

## ⚠️ Ошибки

* `401` — Неавторизован или неверный токен
* `400` — Некорректный запрос/некорректные данные
* `500` — Внутренняя ошибка сервера

**Пример ответа:**

```json
{
  "exitCode": 400,
  "message": "id required"
}
```

---

## 🔗 Прочее

* [Swagger/OpenAPI YAML](documentation/openapi.yaml) — можно открыть через [LabWorks Api Swagger](https://app.swaggerhub.com/apis/ahrorovk_apk/LabWorksAPI/1.0.0)
* Если есть вопросы — создавайте Issues или пишите на почту автора!

---

**Автор:**
[ahrorovk](https://bento.me/ahrorovk)
