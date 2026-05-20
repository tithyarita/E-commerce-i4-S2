import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apolloClient } from '../apollo/client'
import {
  GET_TODOS,
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  TODOS_SUB
} from '../graphql/todos'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<any[]>([])
  const loading = ref(false)

  // 📥 GET TODOS
  async function fetchTodos() {
    loading.value = true

    try {
      const result: any = await apolloClient.query({
        query: GET_TODOS,
        fetchPolicy: 'network-only',
      })

      todos.value = result?.data?.todos ?? []
    } catch (err) {
      console.error('fetchTodos error:', err)
    } finally {
      loading.value = false
    }
  }

  // ➕ ADD TODO
  async function addTodo(title: string) {
    const clean = title.trim()
    if (!clean) return

    try {
      await apolloClient.mutate({
        mutation: ADD_TODO,
        variables: { title: clean },
      })

      await fetchTodos()
    } catch (err) {
      console.error('addTodo error:', err)
    }
  }

  // 🔄 TOGGLE TODO
  async function toggleTodo(todo: any) {
    try {
      await apolloClient.mutate({
        mutation: TOGGLE_TODO,
        variables: {
          id: todo.id,
          done: !todo.is_done,
        },
      })

      await fetchTodos()
    } catch (err) {
      console.error('toggleTodo error:', err)
    }
  }

  // ❌ DELETE TODO
  async function deleteTodo(id: string) {
    try {
      await apolloClient.mutate({
        mutation: DELETE_TODO,
        variables: { id },
      })

      await fetchTodos()
    } catch (err) {
      console.error('deleteTodo error:', err)
    }
  }

  // ⚡ REALTIME (safe version)
  function startRealtime() {
    const obs = apolloClient.subscribe({
      query: TODOS_SUB,
    })

    const sub = obs.subscribe({
      next: (result: any) => {
        todos.value = result?.data?.todos ?? []
      },
      error: (err: any) => {
        console.error('Subscription error:', err)
      },
    })

    return () => sub.unsubscribe()
  }

  return {
    todos,
    loading,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    startRealtime,
  }
})