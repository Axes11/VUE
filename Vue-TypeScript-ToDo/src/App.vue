<template>
  <div id="app">
    <AppHeader/>
    <main class="app-main">
      <AppFilters :active-filter="activeFilter" @set-filter="setFilter"/>
      <AppToDoBody :todos="filteredTodos" @toggleTodo="toggleTodo" @removeTodo="removeTodo"/>
      <AppAddToDo @addTodo="addTodo"/>
    </main>
    <AppFooter :stats="stats"/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import AppHeader from "@/components/AppHeader.vue";
  import AppFilters from "@/components/AppFilters.vue";
  import AppToDoBody from "@/components/AppToDoBody.vue";
  import AppAddToDo from "@/components/AppAddToDo.vue";
  import AppFooter from "@/components/AppFooter.vue";
  import {Stats} from "@/types/Stats";
  import {Todo} from "@/types/Todo";
  import {Filter} from "@/types/Filter";

  interface State {
    todos: Todo[],
    activeFilter: Filter
  }
  export default defineComponent({
    components: {AppFooter, AppAddToDo, AppToDoBody, AppFilters, AppHeader},
    data(): State{
      return{
        todos: [
          {id: 0, text: 'Suck Cocks', completed: true},
          {id: 1, text: 'Learn the basics of Typescript', completed: false},
          {id: 2, text: 'Subscribe to the channel', completed: false}
        ],
        activeFilter: 'All'
      }
    },
    computed: {
      filteredTodos(): Todo[]{
        switch (this.activeFilter){
          case 'All':
            return this.todos
          case 'Active':
            return this.activeTodos
          case 'Done':
            return this.doneTodos
          default:
            return this.todos
        }
      },
      stats(): Stats {
        return{
          active: this.activeTodos.length,
          done: this.doneTodos.length
        }
      },
      activeTodos(): Todo[] {
        return this.todos.filter(todo => !todo.completed)
      },
      doneTodos(): Todo[] {
        return this.todos.filter(todo => todo.completed)
      }
    },
    methods: {
      addTodo(todo: Todo){
        this.todos.push(todo)
      },
      toggleTodo(id: number){
        const target = this.todos.find(todo => todo.id === id)

        if(target){
          target.completed = !target.completed
        }
      },
      removeTodo(id: number){
        this.todos = this.todos.filter(todo => todo.id !== id)
      },
      setFilter(filter: Filter){
        this.activeFilter = filter;
      }
    }
  })
</script>
