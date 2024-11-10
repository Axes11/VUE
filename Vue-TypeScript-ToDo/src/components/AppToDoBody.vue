<template>
  <ul class="todo-list">
    <AppToDoItem v-for="todo in todos" :key="todo.id" :todo="todo" @toggleTodo="toggleTodo" @removeTodo="removeTodo"/>
  </ul>
</template>

<script lang="ts">
  import {defineComponent, PropType} from "vue";
  import AppToDoItem from "@/components/AppToDoItem.vue";
import {Todo} from "@/types/Todo";

  export default defineComponent({
    components: {AppToDoItem},
    props: {
      todos:{
        type: Array as PropType<Todo[]>
      }
    },
    methods: {
      toggleTodo(id: number){
        this.$emit('toggleTodo', id)
      },
      removeTodo(id: number){
        this.$emit('removeTodo', id)
      }
    },
    emits: {
      toggleTodo: (id: number) => true,
      removeTodo: (id: number) => true,
    }
  })
</script>