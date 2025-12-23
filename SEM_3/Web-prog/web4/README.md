# Web4 - Лабораторная работа 4

Приложение для проверки попадания точек в область на координатной плоскости.

## Технологии

### Backend
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security
- PostgreSQL
- JWT для аутентификации
- BCrypt для хэширования паролей

### Frontend
- Angular 17
- PrimeNG 17
- TypeScript 5.2
- RxJS

## Структура проекта

```
.
├── backend/          # Spring Boot приложение
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/ahrorovk/web4/
│   │   │   │   ├── controller/    # REST контроллеры
│   │   │   │   ├── service/        # Бизнес-логика
│   │   │   │   ├── repository/    # Spring Data репозитории
│   │   │   │   ├── model/          # JPA сущности
│   │   │   │   ├── dto/            # DTO классы
│   │   │   │   └── security/       # Конфигурация безопасности
│   │   │   └── resources/
│   │   │       └── application.properties (создается вручную, см. раздел "Установка и запуск")
│   │   └── build.gradle.kts
└── frontend/         # Angular приложение
    ├── src/
    │   ├── app/
    │   │   ├── components/         # Angular компоненты
    │   │   ├── services/           # Сервисы
    │   │   ├── models/             # TypeScript модели
    │   │   ├── guards/             # Route guards
    │   │   └── interceptors/       # HTTP interceptors
    │   └── main.ts
    └── package.json
```

## Установка и запуск

### Backend

1. **Создайте файл конфигурации:**
   
   Создайте файл `backend/src/main/resources/application.properties` и заполните его следующими данными:
   
   ```properties
   # Database Configuration
   spring.datasource.url=jdbc:postgresql://your-host:5432/your-database
   spring.datasource.username=your-username
   spring.datasource.password=your-password
   spring.datasource.driver-class-name=org.postgresql.Driver
   
   # JPA Configuration
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.format_sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
   spring.jpa.properties.hibernate.hbm2ddl.auto=update
   spring.jpa.properties.hibernate.hbm2ddl.jdbc_metadata_extraction_strategy=individually
   
   # Server Configuration
   server.port=8080
   
   # CORS Configuration
   spring.web.cors.allowed-origins=http://localhost:4200
   ```
   
   **Важно:** Замените значения на ваши реальные данные:
   - `your-host` - адрес вашего PostgreSQL сервера
   - `your-database` - имя базы данных
   - `your-username` - имя пользователя БД
   - `your-password` - пароль пользователя БД
   
   ⚠️ **Примечание:** Файл `application.properties` добавлен в `.gitignore` для безопасности, чтобы не хранить конфиденциальные данные в репозитории.

2. Убедитесь, что PostgreSQL запущен и доступен по указанному адресу

3. Перейдите в директорию `backend`:
   ```bash
   cd backend
   ```

4. Запустите приложение:
   ```bash
   ./gradlew bootRun
   ```
   Или используйте IDE для запуска `Web4Application`

Backend будет доступен по адресу: `http://localhost:8080`

### Frontend

1. Установите зависимости:
   ```bash
   cd frontend
   npm install
   ```
2. Запустите dev сервер:
   ```bash
   npm start
   ```

Frontend будет доступен по адресу: `http://localhost:4200`

## Использование

1. Откройте браузер и перейдите на `http://localhost:4200`
2. Зарегистрируйтесь или войдите с существующими учетными данными
3. На основной странице:
   - Введите координаты X, Y и радиус R
   - Или кликните на графике для автоматического определения координат
   - Нажмите "Отправить" для проверки попадания точки
   - Просмотрите результаты в таблице

## Адаптивный дизайн

Приложение поддерживает 3 режима отображения:

- **Мобильный** (< 682px): Вертикальная компоновка, компактные элементы
- **Планшетный** (682px - 1208px): Оптимизированная компоновка
- **Десктопный** (≥ 1209px): Полная компоновка с графиком и формой рядом

## API Endpoints

### Аутентификация
- `POST /api/auth/register` - Регистрация нового пользователя
- `POST /api/auth/login` - Вход в систему

### Результаты
- `POST /api/results/check` - Проверка попадания точки
- `GET /api/results` - Получить все результаты пользователя
- `DELETE /api/results` - Очистить результаты пользователя

## Вариант 89

Область состоит из:
- Треугольника: x ≥ 0, y ≥ 0, x + y ≤ R
- Прямоугольника: x ≥ 0, x ≤ R/2, y ≤ 0, y ≥ -R
- Круга: x ≤ 0, y ≤ 0, x² + y² ≤ (R/2)²

## Автор

Ахроров Кароматуллохон Фирдавсович  
P3210, Вариант 89


