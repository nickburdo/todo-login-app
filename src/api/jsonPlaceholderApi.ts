import type {User} from "../types/user.ts";
import type {Todo} from "../types/todo.ts";

export async function getUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  return response.json()
}

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')

  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }

  return response.json()
}

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
