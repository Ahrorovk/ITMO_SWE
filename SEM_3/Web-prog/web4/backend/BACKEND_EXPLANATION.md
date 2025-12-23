# Подробное объяснение бекенда Web4

## 📁 Структура проекта

Проект использует архитектуру Spring Boot с разделением на слои:
- **Model** - сущности базы данных (JPA Entity)
- **DTO** - объекты для передачи данных (Data Transfer Objects)
- **Repository** - интерфейсы для работы с БД (Spring Data JPA)
- **Service** - бизнес-логика приложения
- **Controller** - REST API endpoints
- **Security** - конфигурация безопасности и JWT аутентификация

---

## 🚀 1. Web4Application.java - Точка входа

```java
@SpringBootApplication
public class Web4Application {
    public static void main(String[] args) {
        SpringApplication.run(Web4Application.class, args);
    }
}
```

### Аннотации:
- **`@SpringBootApplication`** - объединяет три аннотации:
  - `@Configuration` - класс содержит конфигурацию Spring
  - `@EnableAutoConfiguration` - автоматическая настройка Spring Boot
  - `@ComponentScan` - сканирование компонентов в пакете и подпакетах

### Функции:
- **`main()`** - точка входа приложения, запускает Spring Boot контекст

---

## 📊 2. MODEL (Сущности базы данных)

### 2.1. User.java - Модель пользователя

```java
@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String password; // хранится как хэш
    
    @Column(nullable = false)
    private String fullName;
    
    @Column(nullable = false)
    private String groupNumber;
    
    @Column(nullable = false)
    private Integer variant;
}
```

#### Аннотации JPA:
- **`@Entity`** - класс является JPA сущностью (таблица в БД)
- **`@Table(name = "users")`** - имя таблицы в БД
- **`@Id`** - первичный ключ
- **`@GeneratedValue(strategy = GenerationType.IDENTITY)`** - автоинкремент ID
- **`@Column(unique = true, nullable = false)`** - уникальное, обязательное поле
- **`@Column(nullable = false)`** - поле не может быть NULL

#### Lombok аннотации:
- **`@Getter`** - генерирует геттеры для всех полей
- **`@Setter`** - генерирует сеттеры для всех полей
- **`@NoArgsConstructor`** - конструктор без параметров
- **`@AllArgsConstructor`** - конструктор со всеми параметрами
- **`@Builder`** - паттерн Builder для создания объектов

---

### 2.2. Result.java - Модель результата проверки точки

```java
@Entity
@Table(name = "results")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Min(-5) @Max(5) @NotNull
    @Column(nullable = false)
    private Double x;
    
    @Min(-3) @Max(3) @NotNull
    @Column(nullable = false)
    private Double y;
    
    @Min(-5) @Max(5) @NotNull
    @Column(nullable = false)
    private Double r;
    
    @NotNull
    @Column(nullable = false)
    @Builder.Default
    private Boolean result = false;
    
    @NotNull
    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime time = LocalDateTime.now();
    
    @NotNull
    @Column(nullable = false)
    @Builder.Default
    private Long bench = 0L;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
```

#### Валидация (Jakarta Validation):
- **`@Min(-5) @Max(5)`** - значение должно быть в диапазоне [-5, 5]
- **`@NotNull`** - поле не может быть null

#### JPA связи:
- **`@ManyToOne`** - связь "многие к одному" (много результатов у одного пользователя)
- **`fetch = FetchType.LAZY`** - ленивая загрузка (данные загружаются только при обращении)
- **`@JoinColumn(name = "user_id")`** - имя внешнего ключа в таблице results

#### Builder:
- **`@Builder.Default`** - значение по умолчанию при использовании Builder

---

## 📦 3. DTO (Data Transfer Objects) - Объекты для передачи данных

### 3.1. LoginRequest.java - Запрос на вход

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    @NotBlank(message = "Username is required")
    private String username;
    
    @NotBlank(message = "Password is required")
    private String password;
}
```

#### Аннотации:
- **`@Data`** (Lombok) - генерирует геттеры, сеттеры, toString, equals, hashCode
- **`@NotBlank`** - строка не может быть null, пустой или состоять только из пробелов

---

### 3.2. RegisterRequest.java - Запрос на регистрацию

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "Username is required")
    private String username;
    
    @NotBlank(message = "Password is required")
    private String password;
    
    @NotBlank(message = "Full name is required")
    private String fullName;
    
    @NotBlank(message = "Group number is required")
    private String groupNumber;
    
    @NotNull(message = "Variant is required")
    private Integer variant;
}
```

---

### 3.3. AuthResponse.java - Ответ при аутентификации

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;      // JWT токен
    private String username;
    private String fullName;
    private String groupNumber;
    private Integer variant;
}
```

---

### 3.4. PointRequest.java - Запрос на проверку точки

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PointRequest {
    @NotNull(message = "X is required")
    @Min(value = -5, message = "X must be between -5 and 5")
    @Max(value = 5, message = "X must be between -5 and 5")
    private Double x;
    
    @NotNull(message = "Y is required")
    @Min(value = -3, message = "Y must be between -3 and 3")
    @Max(value = 3, message = "Y must be between -3 and 3")
    private Double y;
    
    @NotNull(message = "R is required")
    @Min(value = -5, message = "R must be between -5 and 5")
    @Max(value = 5, message = "R must be between -5 and 5")
    private Double r;
}
```

---

### 3.5. ResultResponse.java - Ответ с результатом проверки

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResultResponse {
    private Long id;
    private Double x;
    private Double y;
    private Double r;
    private Boolean result;    // попал/не попал
    private LocalDateTime time;
    private Long bench;        // время выполнения в микросекундах
}
```

---

## 🗄️ 4. REPOSITORY - Интерфейсы для работы с БД

### 4.1. UserRepository.java

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
}
```

#### Аннотации:
- **`@Repository`** - Spring компонент для работы с данными

#### Наследование:
- **`JpaRepository<User, Long>`** - предоставляет базовые CRUD операции
  - `User` - тип сущности
  - `Long` - тип первичного ключа

#### Методы:
- **`findByUsername(String username)`** - Spring Data JPA автоматически создает запрос:
  ```sql
  SELECT * FROM users WHERE username = ?
  ```
- **`existsByUsername(String username)`** - проверяет существование пользователя

---

### 4.2. ResultRepository.java

```java
@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByUserOrderByTimeDesc(User user);
    Page<Result> findByUserOrderByTimeDesc(User user, Pageable pageable);
    void deleteByUser(User user);
}
```

#### Методы:
- **`findByUserOrderByTimeDesc(User user)`** - находит все результаты пользователя, отсортированные по времени (новые сначала)
- **`findByUserOrderByTimeDesc(User user, Pageable pageable)`** - то же самое, но с пагинацией
- **`deleteByUser(User user)`** - удаляет все результаты пользователя

---

## 🔧 5. SERVICE - Бизнес-логика

### 5.1. JwtService.java - Работа с JWT токенами

```java
@Service
public class JwtService {
    @Value("${jwt.secret:mySecretKey...}")
    private String secret;
    
    @Value("${jwt.expiration:86400000}") // 24 hours
    private Long expiration;
}
```

#### Аннотации:
- **`@Service`** - Spring компонент для бизнес-логики
- **`@Value("${jwt.secret:default}")`** - инъекция значения из application.properties, если нет - используется значение по умолчанию

#### Методы:

**`generateToken(String username)`**
- Создает JWT токен для пользователя
- Возвращает строку токена

**`createToken(Map<String, Object> claims, String subject)`**
- Создает токен с claims (данные) и subject (username)
- Устанавливает время создания и истечения
- Подписывает токен секретным ключом

**`extractUsername(String token)`**
- Извлекает username из токена

**`extractExpiration(String token)`**
- Извлекает дату истечения токена

**`extractAllClaims(String token)`**
- Парсит токен и извлекает все claims
- Проверяет подпись токена

**`isTokenExpired(String token)`**
- Проверяет, истек ли токен

**`validateToken(String token, String username)`**
- Валидирует токен: проверяет username и срок действия

**`getSigningKey()`**
- Создает секретный ключ для подписи/проверки токена из строки secret

---

### 5.2. AuthService.java - Аутентификация и регистрация

```java
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
}
```

#### Аннотации:
- **`@RequiredArgsConstructor`** (Lombok) - создает конструктор для final полей

#### Методы:

**`register(RegisterRequest request)`**
- **`@Transactional`** - метод выполняется в транзакции (все или ничего)
- Проверяет, существует ли username
- Хэширует пароль с помощью `passwordEncoder`
- Создает нового пользователя через Builder
- Сохраняет в БД
- Генерирует JWT токен
- Возвращает `AuthResponse` с токеном и данными пользователя

**`login(LoginRequest request)`**
- Находит пользователя по username
- Проверяет пароль с помощью `passwordEncoder.matches()`
- Генерирует JWT токен
- Возвращает `AuthResponse`

---

### 5.3. ResultService.java - Логика проверки точек

```java
@Service
@RequiredArgsConstructor
public class ResultService {
    private final ResultRepository resultRepository;
    private final UserRepository userRepository;
}
```

#### Методы:

**`checkPoint(PointRequest request, String username)`**
- Находит пользователя по username
- Замеряет время выполнения проверки (в наносекундах)
- Вызывает `checkHit()` для проверки попадания
- Конвертирует время в микросекунды
- Создает объект `Result` через Builder
- Сохраняет в БД
- Возвращает `ResultResponse`

**`checkHit(double x, double y, double r)` - ПРИВАТНЫЙ МЕТОД**
- Проверяет попадание точки в область (вариант 88):
  - **Треугольник**: `x >= 0 && y >= 0 && x + y <= r`
  - **Прямоугольник**: `x >= 0 && x <= r/2 && y <= 0 && y >= -r`
  - **Круг**: `x <= 0 && y <= 0 && (x² + y² <= (r/2)²)`
- Возвращает `true` если точка попала хотя бы в одну область

**`getUserResults(String username)`**
- Находит все результаты пользователя
- Сортирует по времени (новые сначала)
- Конвертирует в `ResultResponse` через `mapToResponse()`
- Возвращает список

**`getUserResults(String username, Pageable pageable)`**
- То же самое, но с пагинацией
- Возвращает `Page<ResultResponse>`

**`clearUserResults(String username)`**
- **`@Transactional`** - выполняется в транзакции
- Удаляет все результаты пользователя

**`mapToResponse(Result result)` - ПРИВАТНЫЙ МЕТОД**
- Конвертирует `Result` (сущность БД) в `ResultResponse` (DTO)

---

### 5.4. UserDetailsServiceImpl.java - Загрузка пользователя для Spring Security

```java
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        
        return new org.springframework.security.core.userdetails.User(
            user.getUsername(),
            user.getPassword(),
            new ArrayList<>()  // роли (пустой список)
        );
    }
}
```

#### Интерфейс:
- **`UserDetailsService`** - интерфейс Spring Security для загрузки пользователя
- Метод `loadUserByUsername()` вызывается Spring Security для аутентификации

#### Что делает:
- Находит пользователя в БД
- Создает объект `UserDetails` (стандартный класс Spring Security)
- Возвращает его для дальнейшей проверки пароля

---

## 🔒 6. SECURITY - Конфигурация безопасности

### 6.1. SecurityConfig.java - Основная конфигурация безопасности

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;
}
```

#### Аннотации:
- **`@Configuration`** - класс содержит конфигурацию Spring
- **`@EnableWebSecurity`** - включает Spring Security
- **`@EnableMethodSecurity`** - включает безопасность на уровне методов

#### Bean методы:

**`securityFilterChain(HttpSecurity http)`**
- Настраивает цепочку фильтров безопасности:
  - **`csrf().disable()`** - отключает CSRF защиту (для REST API не нужна)
  - **`cors()`** - настраивает CORS (разрешает запросы с фронтенда)
  - **`authorizeHttpRequests()`** - настраивает авторизацию:
    - `/api/auth/**` - доступно всем (permitAll)
    - Остальные запросы - требуют аутентификации (authenticated)
  - **`sessionManagement().stateless()`** - без сессий (используем JWT)
  - **`authenticationProvider()`** - провайдер аутентификации
  - **`addFilterBefore()`** - добавляет JWT фильтр перед стандартным фильтром

**`corsConfigurationSource()`**
- Настраивает CORS:
  - Разрешенный origin: `http://localhost:4200` (Angular)
  - Разрешенные методы: GET, POST, PUT, DELETE, OPTIONS
  - Разрешены все заголовки
  - Разрешены credentials (cookies, authorization headers)

**`authenticationProvider()`**
- Создает `DaoAuthenticationProvider`:
  - Использует `UserDetailsService` для загрузки пользователя
  - Использует `PasswordEncoder` для проверки пароля

**`authenticationManager(AuthenticationConfiguration config)`**
- Создает менеджер аутентификации

**`passwordEncoder()`**
- Создает `BCryptPasswordEncoder` для хэширования паролей

---

### 6.2. JwtAuthenticationFilter.java - Фильтр для проверки JWT токенов

```java
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
}
```

#### Наследование:
- **`OncePerRequestFilter`** - фильтр, который выполняется один раз на запрос

#### Метод:

**`doFilterInternal(HttpServletRequest, HttpServletResponse, FilterChain)`**
- Извлекает токен из заголовка `Authorization: Bearer <token>`
- Если токена нет - пропускает запрос дальше
- Извлекает username из токена
- Загружает `UserDetails` из БД
- Валидирует токен
- Если токен валиден - устанавливает аутентификацию в `SecurityContext`
- Пропускает запрос дальше по цепочке фильтров

#### Логика:
1. Проверяет наличие заголовка `Authorization`
2. Извлекает JWT токен (убирает префикс "Bearer ")
3. Извлекает username из токена
4. Если username найден и пользователь еще не аутентифицирован:
   - Загружает данные пользователя из БД
   - Валидирует токен
   - Создает `Authentication` объект
   - Устанавливает его в `SecurityContext`
5. Продолжает выполнение запроса

---

## 🌐 7. CONTROLLER - REST API Endpoints

### 7.1. AuthController.java - Эндпоинты аутентификации

```java
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    private final AuthService authService;
}
```

#### Аннотации:
- **`@RestController`** - REST контроллер (автоматически конвертирует ответы в JSON)
- **`@RequestMapping("/api/auth")`** - базовый путь для всех методов
- **`@CrossOrigin`** - разрешает CORS запросы с указанного origin

#### Методы:

**`register(@Valid @RequestBody RegisterRequest request)`**
- **`@PostMapping("/register")`** - POST `/api/auth/register`
- **`@Valid`** - валидирует данные запроса
- **`@RequestBody`** - тело запроса (JSON) конвертируется в объект
- Вызывает `authService.register()`
- Возвращает `ResponseEntity<AuthResponse>` (HTTP 200 OK)

**`login(@Valid @RequestBody LoginRequest request)`**
- **`@PostMapping("/login")`** - POST `/api/auth/login`
- Вызывает `authService.login()`
- Возвращает `ResponseEntity<AuthResponse>`

---

### 7.2. ResultController.java - Эндпоинты для работы с результатами

```java
@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class ResultController {
    private final ResultService resultService;
}
```

#### Аннотации:
- **`@Slf4j`** (Lombok) - добавляет логгер `log`

#### Методы:

**`checkPoint(@Valid @RequestBody PointRequest request, Authentication authentication)`**
- **`@PostMapping("/check")`** - POST `/api/results/check`
- **`Authentication authentication`** - автоматически инъектируется Spring Security (из JWT токена)
- Валидирует запрос
- Извлекает username из `authentication`
- Вызывает `resultService.checkPoint()`
- Возвращает `ResponseEntity<ResultResponse>`

**`getUserResults(Authentication authentication, @RequestParam Integer page, Integer size)`**
- **`@GetMapping`** - GET `/api/results`
- Поддерживает пагинацию через query параметры `?page=0&size=10`
- Если параметры указаны - возвращает страницу результатов
- Иначе - возвращает все результаты
- Возвращает `ResponseEntity<List<ResultResponse>>`

**`clearResults(Authentication authentication)`**
- **`@DeleteMapping`** - DELETE `/api/results`
- Удаляет все результаты текущего пользователя
- Возвращает `ResponseEntity<Void>` (HTTP 200 OK)

---

## 🔄 Поток выполнения запроса

### Пример: Проверка точки

1. **Frontend** отправляет POST `/api/results/check` с JWT токеном в заголовке `Authorization: Bearer <token>`

2. **JwtAuthenticationFilter**:
   - Извлекает токен
   - Валидирует его
   - Загружает пользователя
   - Устанавливает аутентификацию в `SecurityContext`

3. **SecurityConfig**:
   - Проверяет, что запрос требует аутентификации
   - Проверяет, что пользователь аутентифицирован

4. **ResultController.checkPoint()**:
   - Получает `Authentication` из `SecurityContext`
   - Извлекает username
   - Вызывает `resultService.checkPoint()`

5. **ResultService.checkPoint()**:
   - Находит пользователя в БД
   - Проверяет попадание точки
   - Сохраняет результат в БД
   - Возвращает `ResultResponse`

6. **ResultController**:
   - Конвертирует `ResultResponse` в JSON
   - Отправляет ответ клиенту

---

## 📝 Итоговая схема архитектуры

```
Frontend (Angular)
    ↓ HTTP Request (JWT Token)
Controller (REST API)
    ↓
Security Filter (JWT Validation)
    ↓
Service (Business Logic)
    ↓
Repository (Database Access)
    ↓
Database (PostgreSQL)
```

---

## 🔑 Ключевые концепции

1. **JWT (JSON Web Token)** - токен для аутентификации без сессий
2. **Spring Security** - фреймворк для безопасности
3. **JPA/Hibernate** - ORM для работы с БД
4. **Spring Data JPA** - упрощает работу с репозиториями
5. **DTO Pattern** - разделение сущностей БД и объектов для передачи данных
6. **Dependency Injection** - автоматическое внедрение зависимостей через конструкторы
7. **Builder Pattern** - удобное создание объектов через Lombok

---

Это полное объяснение бекенда! Если нужны уточнения по какому-то конкретному файлу или методу - спрашивайте!

