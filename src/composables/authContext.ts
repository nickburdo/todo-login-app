import { inject, provide, ref, type InjectionKey, type Ref } from 'vue'
import type {User} from "../types/user.ts";

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