
# RESTful API: Армия

## 📌 Описание
RESTful API по теме "Армия", разработанный на собственном фреймворке (ЛР5) **без использования сторонних библиотек**.

Проект реализует API для работы с двумя сущностями:
- **Солдаты (`soldiers`)**
- **Воинские части (`units`)**

Хранение данных осуществляется в JSON-файлах: `soldiers.json` и `units.json`.

---

## 🗂 Структура проекта

```
project-root/
├── server.js
├── src/
│   ├── controllers/
│   │   ├── soldierController.js
│   │   └── unitController.js
│   ├── services/
│   │   ├── soldierService.js
│   │   └── unitService.js
│   ├── routes/
│   │   └── apiV1.js
│   ├── db/
│   │   ├── db.js
│   │   ├── soldiers.json
│   │   └── units.json
│   ├── framework/
│   │   ├── app.js
│   │   └── router.js
│   └── middlewares/
│       ├── parseBody.js
│       ├── enhanceResponse.js
│       └── errorHandler.js
```

---

##  Принципы разработки

- **SOLID** — разделение ответственности между слоями
- **DRY** — переиспользуемая логика
- **KISS** — простота архитектуры
- **YAGNI** — нет лишнего кода

---

## 🔌 Версия API

Все маршруты работают через префикс:

```
/api/v1
```

---

##  Сущности и структура

### 🪖 `soldiers.json`
```json
{
  "id": 1,
  "name": "Александр Сидоров",
  "rank": "Рядовой",
  "age": 22,
  "isActive": true,
  "enlistmentDate": "2023-04-01T00:00:00Z",
  "skills": ["связь", "полевой устав"]
}
```

###  `units.json`
```json
{
  "id": 1,
  "name": "102-я танковая дивизия",
  "location": "Гродно",
  "formedAt": "2022-06-15T00:00:00Z",
  "active": true,
  "soldierIds": [1]
}
```

---

## 📡 Эндпоинты

### Soldiers

| Метод  | URL                       | Описание                            |
|--------|---------------------------|-------------------------------------|
| GET    | `/api/v1/soldiers`        | Получить всех солдат                |
| GET    | `/api/v1/soldiers/:id`    | Получить одного солдата по ID       |
| POST   | `/api/v1/soldiers`        | Добавить нового солдата             |
| PUT    | `/api/v1/soldiers/:id`    | Полностью обновить солдата         |
| PATCH  | `/api/v1/soldiers/:id`    | Частично обновить солдата          |
| DELETE | `/api/v1/soldiers/:id`    | Удалить солдата                     |

### Units

| Метод  | URL                    | Описание                            |
|--------|------------------------|-------------------------------------|
| GET    | `/api/v1/units`        | Получить все воинские части         |
| GET    | `/api/v1/units/:id`    | Получить часть по ID                |
| POST   | `/api/v1/units`        | Добавить новую часть                |
| PUT    | `/api/v1/units/:id`    | Полностью обновить часть            |
| PATCH  | `/api/v1/units/:id`    | Частично обновить часть             |
| DELETE | `/api/v1/units/:id`    | Удалить часть                       |

---

## 🛠 Особенности

- Собственная реализация body-parser: `parseBody.js`
- Расширенные методы ответа (`res.json`, `res.status`) через `enhanceResponse.js`
- Логика записи и чтения JSON через `db.js`
- Обработка ошибок: `errorHandler.js`
- Полностью читаемая архитектура

---

## 🔀 Пример curl-запроса

```bash
curl -X POST http://localhost:3000/api/v1/soldiers   -H "Content-Type: application/json"   -d '{"name": "Иван", "rank": "Сержант", "age": 25, "isActive": true, "enlistmentDate": "2023-01-01T00:00:00Z", "skills": ["разведка", "огневая подготовка"]}'
```

---

##  GitHub

- Ветка: `develop`
- PR в `main` без merge
- В `README.md` описаны все маршруты и сущности

---

##  Выполнено по заданию ЛР6
