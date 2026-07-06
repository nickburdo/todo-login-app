# План работ: Login + Todo List

Стек: **Vue 3 + Vue Router + Tailwind CSS**

## 0. Уточнение по ТЗ

- Использовать **Vue 3**.
- Использовать **Vue Router** для перехода между страницами.
- Использовать **Tailwind CSS** для адаптивной вёрстки.
- Данные брать из REST API:
  - users: `https://jsonplaceholder.typicode.com/users`
  - todos: `https://jsonplaceholder.typicode.com/todos`
- Текущего пользователя хранить в памяти приложения через `provide/inject`.
- Избранные todo хранить в `localStorage`.
- Не хранить в `localStorage` данные авторизации, фильтры, поиск и созданные todo, потому что этого нет в ТЗ.

---

## 1. Создание проекта

- [x] Создать Vue-проект через Vite и перейти в папку проекта:
- [ ] Инициализировать Git-репозиторий (`git init`).
- [ ] Создать первый коммит после базовой настройки проекта.


- [ ] Установить зависимости:

```bash
npm install
```

- [ ] Установить Vue Router:

```bash
npm install vue-router
```

- [ ] Установить Tailwind CSS:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] Подключить Tailwind в `vite.config.ts`.
- [ ] Подключить Tailwind в главный CSS-файл, например `src/style.css`.
- [ ] Проверить запуск проекта:

```bash
npm run dev
```

---

## 2. Базовая структура проекта

- [ ] Привести проект к понятной структуре:

```text
src/
  api/
    jsonPlaceholderApi.ts
  router/
    index.ts
  pages/
    LoginPage.vue
    TodosPage.vue
  components/
    LoginForm.vue
    UserInfo.vue
    TodoFilters.vue
    TodoCreateForm.vue
    TodoList.vue
    TodoItem.vue
  types/
    user.ts
    todo.ts
  composables/
    authContext.ts
  utils/
    localStorage.ts
  App.vue
  main.ts
  style.css
```

- [ ] Вынести типы `User` и `Todo` в отдельные файлы.
- [ ] Вынести работу с API в отдельный файл.
- [ ] Вынести auth state текущего пользователя в `provide/inject`.
- [ ] Вынести работу с `localStorage` в отдельный utility-файл только для избранных todo.

---

## 3. Типы данных

### `User`

- [ ] Создать тип пользователя на основе ответа API:

```ts
export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
  }
}
```

### `Todo`

- [ ] Создать тип задачи:

```ts
export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}
```

---

## 4. Настройка Vue Router

- [ ] Создать роутер в `src/router/index.ts`.
- [ ] Добавить два маршрута:

```ts
const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/todos',
    name: 'todos',
    component: TodosPage,
  },
]
```

- [ ] Подключить роутер в `main.ts`.
- [ ] В `App.vue` оставить только `<RouterView />`.
- [ ] Проверить переход между страницами вручную.

---

## 5. API-слой

- [ ] Создать файл `src/api/jsonPlaceholderApi.ts`.
- [ ] Реализовать функцию получения пользователей:

```ts
export async function getUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  return response.json()
}
```

- [ ] Реализовать функцию получения todo:

```ts
export async function getTodos(): Promise<Todo[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')

  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }

  return response.json()
}
```

- [ ] Реализовать функцию создания todo:

```ts
export async function createTodo(data: Pick<Todo, 'userId' | 'title'>): Promise<Todo> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      completed: false,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to create todo')
  }

  return response.json()
}
```

---

## 6. Страница входа

### Основная задача

- [ ] На главной странице `/` вывести форму входа.
- [ ] В форме должны быть поля:
  - `Username`
  - `Phone number`
  - кнопка `Login`

### Валидация username

- [ ] Поле `Username` должно принимать только буквы.
- [ ] При вводе удалять все символы, кроме букв.
- [ ] Можно разрешить латиницу и кириллицу:

```ts
username.value = value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '')
```

### Валидация phone

- [ ] Поле `Phone number` должно принимать числа и символы.
- [ ] Не ограничивать ввод жёстко, потому что в API телефоны содержат символы вроде `-`, `.`, `x`, пробелы и скобки.

### Логика входа

- [ ] При нажатии `Login` загрузить список пользователей.
- [ ] Найти пользователя, у которого совпадают:
  - `username`
  - `phone`
- [ ] Сравнение username лучше делать без учёта регистра:

```ts
user.username.toLowerCase() === username.value.toLowerCase()
```

- [ ] Phone сравнивать как строку после `trim()`:

```ts
user.phone.trim() === phone.value.trim()
```

- [ ] Если пользователь найден:
  - записать пользователя в auth context через `provide/inject`;
  - выполнить редирект на `/todos`.
- [ ] Если пользователь не найден:
  - показать ошибку `login error`.

### Хранение текущего пользователя через provide/inject

- [ ] Не хранить текущего пользователя в `localStorage`, потому что ТЗ требует `localStorage` только для избранных todo.
- [ ] Создать auth context, который хранит пользователя в памяти приложения.
- [ ] Создать файл `src/composables/authContext.ts`.
- [ ] В auth context описать:
  - `currentUser` — текущий пользователь;
  - `setCurrentUser(user)` — запись пользователя после успешного login;
  - `clearCurrentUser()` — очистка пользователя при logout.

Пример:

```ts
import { inject, provide, ref, type InjectionKey, type Ref } from 'vue'
import type { User } from '@/types/user'

interface AuthContext {
  currentUser: Ref<User | null>
  setCurrentUser: (user: User) => void
  clearCurrentUser: () => void
}

const authKey: InjectionKey<AuthContext> = Symbol('auth')

export function provideAuth() {
  const currentUser = ref<User | null>(null)

  function setCurrentUser(user: User) {
    currentUser.value = user
  }

  function clearCurrentUser() {
    currentUser.value = null
  }

  provide(authKey, {
    currentUser,
    setCurrentUser,
    clearCurrentUser,
  })
}

export function useAuth() {
  const auth = inject(authKey)

  if (!auth) {
    throw new Error('useAuth must be used inside provider')
  }

  return auth
}
```

- [ ] Вызвать `provideAuth()` в верхнем компоненте, например в `App.vue`.
- [ ] После успешного login вызвать `setCurrentUser(user)`.
- [ ] На странице `/todos` читать пользователя через `useAuth()`.
- [ ] Если пользователя нет — редиректить обратно на `/`.

---

## 7. Защита страницы todos

- [ ] В `TodosPage.vue` получить `currentUser` через `useAuth()`.
- [ ] Если пользователя нет в auth context, выполнить редирект на `/`.
- [ ] Можно сделать это внутри `onMounted()` или `watchEffect()`:

```ts
const router = useRouter()
const { currentUser } = useAuth()

onMounted(() => {
  if (!currentUser.value) {
    router.push('/')
  }
})
```

- [ ] Важно: после перезагрузки страницы auth context очистится, поэтому пользователь вернётся на login. Это нормально, потому что ТЗ не требует хранить сессию.
- [ ] Более аккуратный вариант — добавить navigation guard в Vue Router, но для тестового задания достаточно проверки в компоненте.

---

## 8. Страница todos

### Данные пользователя

- [ ] В верхней части страницы вывести персональные данные пользователя.
- [ ] Минимально вывести:
  - name
  - username
  - email
  - phone
  - website
  - company name
  - city

- [ ] Оформить блок пользователя карточкой через Tailwind.

### Загрузка todos

- [ ] При открытии страницы `/todos` загрузить todos из API.
- [ ] Сохранить их в реактивный массив:

```ts
const todos = ref<Todo[]>([])
```

- [ ] Добавить состояние загрузки:

```ts
const isLoading = ref(false)
```

- [ ] Добавить состояние ошибки:

```ts
const error = ref('')
```

- [ ] При ошибке показать сообщение на странице.

---

## 9. Вывод списка todo

- [ ] Создать компонент `TodoList.vue`.
- [ ] Создать компонент `TodoItem.vue`.
- [ ] Передавать todo в `TodoItem` через props.
- [ ] Вывести для каждой задачи:
  - id
  - userId
  - title
  - completed/uncompleted
  - кнопку или иконку избранного

- [ ] Использовать `v-for`:

```vue
<TodoItem
  v-for="todo in filteredTodos"
  :key="todo.id"
  :todo="todo"
/>
```

- [ ] Для completed/uncompleted использовать разные текстовые метки.
- [ ] Можно добавить разные стили через условные классы.

---

## 10. Фильтр по статусу

- [ ] Создать select со статусами:
  - `All`
  - `Completed`
  - `Uncompleted`
  - `Favorites`

- [ ] Создать реактивное состояние:

```ts
const statusFilter = ref<'all' | 'completed' | 'uncompleted' | 'favorites'>('all')
```

- [ ] В computed-фильтрации реализовать правила:
  - `all` — показывать все задачи;
  - `completed` — только `todo.completed === true`;
  - `uncompleted` — только `todo.completed === false`;
  - `favorites` — только задачи, id которых есть в избранном.

---

## 11. Фильтр по userId

- [ ] Создать select с опциями:
  - `All Users`
  - уникальные `userId` из списка todos

- [ ] Получить уникальные userId через computed:

```ts
const userIds = computed(() => {
  return [...new Set(todos.value.map(todo => todo.userId))]
})
```

- [ ] Создать состояние выбранного пользователя:

```ts
const selectedUserId = ref<number | 'all'>('all')
```

- [ ] Если выбран `All Users`, не фильтровать по пользователю.
- [ ] Если выбран конкретный userId, показывать только его задачи.

---

## 12. Поиск по title

- [ ] Добавить input для поиска.
- [ ] Создать состояние:

```ts
const searchQuery = ref('')
```

- [ ] Поиск должен работать вместе с выбранными фильтрами.
- [ ] Сравнение делать без учёта регистра:

```ts
todo.title.toLowerCase().includes(searchQuery.value.toLowerCase())
```

---

## 13. Общая computed-фильтрация

- [ ] Создать `filteredTodos` через `computed`.
- [ ] Последовательно применить:
  - фильтр по статусу;
  - фильтр по userId;
  - поиск по title.

Пример логики:

```ts
const filteredTodos = computed(() => {
  return todos.value.filter(todo => {
    const matchesStatus =
      statusFilter.value === 'all' ||
      (statusFilter.value === 'completed' && todo.completed) ||
      (statusFilter.value === 'uncompleted' && !todo.completed) ||
      (statusFilter.value === 'favorites' && favoriteIds.value.includes(todo.id))

    const matchesUser =
      selectedUserId.value === 'all' || todo.userId === selectedUserId.value

    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase().trim())

    return matchesStatus && matchesUser && matchesSearch
  })
})
```

---

## 14. Блок Create todo

- [ ] Создать компонент `TodoCreateForm.vue`.
- [ ] Внутри компонента добавить поля:
  - `User ID`
  - `Title`
  - кнопка `Add`

- [ ] `User ID` должен быть числом.
- [ ] `Title` не должен быть пустым.
- [ ] При клике `Add` отправить POST-запрос на API.
- [ ] После успешного ответа добавить новую задачу в локальный массив todos.

Важно: JSONPlaceholder не сохраняет данные реально на сервере, но возвращает успешный ответ. Поэтому после ответа API задачу нужно добавить в массив вручную.

- [ ] Так как JSONPlaceholder часто возвращает `id: 201`, лучше защититься от дублей и сгенерировать локальный id:

```ts
const localId = Math.max(...todos.value.map(todo => todo.id)) + 1
```

- [ ] Добавить задачу в начало или конец списка:

```ts
todos.value.unshift({
  ...createdTodo,
  id: localId,
  completed: false,
})
```

- [ ] После добавления очистить поля формы.

---

## 15. Избранное через localStorage

- [ ] Создать ключ для localStorage:

```ts
const FAVORITES_KEY = 'favoriteTodoIds'
```

- [ ] Хранить только массив id:

```ts
[1, 5, 12]
```

- [ ] При загрузке страницы читать избранное из `localStorage`.
- [ ] Если данных нет — использовать пустой массив.
- [ ] Реализовать функцию добавления/удаления из избранного:

```ts
function toggleFavorite(todoId: number) {
  if (favoriteIds.value.includes(todoId)) {
    favoriteIds.value = favoriteIds.value.filter(id => id !== todoId)
  } else {
    favoriteIds.value.push(todoId)
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds.value))
}
```

- [ ] Передавать в `TodoItem`:
  - является ли задача избранной;
  - обработчик переключения избранного.

- [ ] Для избранной задачи показать активное состояние кнопки, например `★`.
- [ ] Для обычной задачи показать `☆`.

---

## 16. Tailwind-вёрстка

### Общие стили

- [ ] Сделать аккуратный responsive layout.
- [ ] Использовать контейнер:

```html
<div class="mx-auto max-w-6xl px-4 py-6">
```

- [ ] Для карточек использовать:

```html
<div class="rounded-xl border bg-white p-4 shadow-sm">
```

- [ ] Для форм использовать вертикальный layout на мобильных и горизонтальный на больших экранах.

### Login page

- [ ] Центрировать форму по экрану.
- [ ] Сделать карточку формы.
- [ ] Добавить визуальное отображение ошибки.
- [ ] Добавить disabled-состояние кнопки во время загрузки.

### Todos page

- [ ] Верхний блок — карточка пользователя.
- [ ] Ниже — блок фильтров.
- [ ] Ниже — блок Create todo.
- [ ] Ниже — список задач.
- [ ] Использовать CSS Grid/Flexbox через Tailwind:

```html
<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
```

- [ ] На мобильных список должен быть в одну колонку.
- [ ] На планшете — в две колонки.
- [ ] На десктопе — в три колонки.

---

## 17. Состояния интерфейса

- [ ] Показать loading при загрузке users.
- [ ] Показать loading при загрузке todos.
- [ ] Показать ошибку при проблемах с API.
- [ ] Показать пустое состояние, если по фильтрам ничего не найдено:

```text
No todos found
```

- [ ] Заблокировать кнопку `Login`, если поля пустые.
- [ ] Заблокировать кнопку `Add`, если `User ID` или `Title` невалидны.

---

## 18. Logout

- [ ] Добавить кнопку `Logout` на странице todos.
- [ ] При клике:
  - вызвать `clearCurrentUser()` из auth context;
  - выполнить редирект на `/`.

```ts
const { clearCurrentUser } = useAuth()

clearCurrentUser()
router.push('/')
```

---

## 19. Минимальный порядок реализации

- [ ] Создать проект Vue + Vite.
- [ ] Подключить Tailwind.
- [ ] Подключить Vue Router.
- [ ] Создать страницы `/` и `/todos`.
- [ ] Реализовать форму входа.
- [ ] Реализовать проверку username + phone через users API.
- [ ] Сохранять успешного пользователя в auth context через `provide/inject`.
- [ ] Сделать редирект на `/todos`.
- [ ] На `/todos` вывести данные пользователя.
- [ ] Загрузить todos из API.
- [ ] Вывести список todos.
- [ ] Добавить фильтр по статусу.
- [ ] Добавить фильтр по userId.
- [ ] Добавить поиск по title.
- [ ] Добавить создание todo.
- [ ] Добавить избранное через localStorage.
- [ ] Добавить адаптивную вёрстку.
- [ ] Добавить logout.
- [ ] Проверить весь пользовательский сценарий.

---

## 20. Проверка сценариев

### Login success

- [ ] Открыть `/`.
- [ ] Ввести существующий username из API.
- [ ] Ввести соответствующий phone.
- [ ] Нажать `Login`.
- [ ] Проверить редирект на `/todos`.
- [ ] Проверить, что данные пользователя отображаются сверху.

### Login error

- [ ] Ввести неправильный username или phone.
- [ ] Нажать `Login`.
- [ ] Проверить сообщение `login error`.
- [ ] Убедиться, что редиректа нет.

### Todos

- [ ] Проверить, что все todos загрузились.
- [ ] Проверить фильтр `Completed`.
- [ ] Проверить фильтр `Uncompleted`.
- [ ] Проверить фильтр `Favorites`.
- [ ] Проверить фильтр по userId.
- [ ] Проверить поиск по title.
- [ ] Проверить совместную работу всех фильтров.

### Create todo

- [ ] Ввести User ID.
- [ ] Ввести Title.
- [ ] Нажать Add.
- [ ] Проверить успешный POST-запрос.
- [ ] Проверить, что todo появился в списке.

### Favorites

- [ ] Добавить todo в избранное.
- [ ] Обновить страницу.
- [ ] Проверить, что избранное сохранилось.
- [ ] Выбрать фильтр `Favorites`.
- [ ] Проверить, что отображаются только избранные задачи.

### Logout

- [ ] Нажать Logout.
- [ ] Проверить очистку пользователя из auth context.
- [ ] Проверить редирект на `/`.
- [ ] Попробовать открыть `/todos` напрямую после logout или после обновления страницы.
- [ ] Проверить возврат на `/`.

---

## 21. Что можно добавить сверх ТЗ

- [ ] Debounce для поиска по title.
- [ ] Navigation guard для защиты `/todos`.
- [ ] Разделение логики на composables:
  - `useAuth()`
  - `useTodos()`
  - `useFavorites()`
- [ ] Нормализация phone перед сравнением.
- [ ] Сохранение фильтров в query params.
- [ ] Небольшой README с инструкцией запуска.

---

## 22. Критерии готовности

- [ ] Проект запускается через `npm run dev`.
- [ ] Главная страница содержит форму login.
- [ ] Username принимает только буквы.
- [ ] Phone принимает числа и символы.
- [ ] Login success работает по данным users API.
- [ ] Login error отображается при несовпадении данных.
- [ ] После успешного входа открывается страница todos.
- [ ] На странице todos отображаются данные пользователя.
- [ ] Todos загружаются из API и выводятся списком.
- [ ] Работает фильтр по статусу.
- [ ] Работает фильтр по userId.
- [ ] Работает поиск по title.
- [ ] Работает создание todo после POST-запроса.
- [ ] Работает добавление todo в избранное.
- [ ] Избранное сохраняется в localStorage.
- [ ] Работает фильтр Favorites.
- [ ] Интерфейс адаптивный.
- [ ] Код разделён на страницы, компоненты, api, types и utils.
