<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTodoStore } from '../stores/todo.store'

const store = useTodoStore()
const title = ref('')
let stop: any = null

onMounted(async () => {
  await store.fetchTodos()
  stop = store.startRealtime()
})

onBeforeUnmount(() => stop?.())

function add() {
  store.addTodo(title.value)
  title.value = ''
}
</script>

<template>
  <div class="page">
    <div class="todo-card">
      <h1>🌸 Cozy Todos</h1>

      <div class="add-box">
        <input
          v-model="title"
          placeholder="What do you need to do?"
          @keyup.enter="add"
        />

        <button @click="add">
          Add
        </button>
      </div>

      <p v-if="store.loading" class="loading">
        Loading todos...
      </p>

      <ul class="todo-list">
        <li
          v-for="t in store.todos"
          :key="t.id"
          class="todo-item"
        >
          <label class="todo-left">
            <input
              type="checkbox"
              :checked="t.is_done"
              @change="store.toggleTodo(t)"
            />

            <span :class="{ done: t.is_done }">
              {{ t.title }}
            </span>
          </label>

          <button
            class="delete-btn"
            @click="store.deleteTodo(t.id)"
          >
            ✕
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #ffd6e8, #ffeccf);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  font-family: Arial, Helvetica, sans-serif;
}

.todo-card {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  color: #ff5c8a;
  margin-bottom: 25px;
  font-size: 32px;
}

.add-box {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

.add-box input {
  flex: 1;
  padding: 14px;
  border-radius: 14px;
  border: 2px solid #ffd2df;
  outline: none;
  font-size: 16px;
  transition: 0.2s;
}

.add-box input:focus {
  border-color: #ff8fb1;
}

.add-box button {
  background: #ff8fb1;
  color: white;
  border: none;
  border-radius: 14px;
  padding: 0 20px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
}

.add-box button:hover {
  background: #ff6f99;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  background: #fff7fa;
  border-radius: 16px;
  padding: 14px 18px;
  margin-bottom: 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: 0.2s;
}

.todo-item:hover {
  transform: translateY(-2px);
}

.todo-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.todo-left input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #ff8fb1;
  cursor: pointer;
}

.todo-left span {
  font-size: 17px;
  color: #444;
}

.done {
  text-decoration: line-through;
  opacity: 0.5;
}

.delete-btn {
  background: #ffd2df;
  border: none;
  color: #ff4d79;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
}

.delete-btn:hover {
  background: #ffb3c7;
}

.loading {
  text-align: center;
  color: #888;
  margin-bottom: 15px;
}
</style>