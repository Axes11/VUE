<script setup lang="ts">
  import { ref } from 'vue'
  import type { GameStatus } from '@/types/GameStatus'

  interface Props {
    word: string
  }

  defineProps<Props>()

  const isVisible = ref(false)
  const gameStatus = ref<GameStatus | null>(null)
  const open = (status: GameStatus) => {
    gameStatus.value = status
    isVisible.value = true
  }
  const close = () => {
    isVisible.value = false
  }

  defineExpose({
    open,
    close
  })

  const emit = defineEmits<{
    (e: 'restart') : void
  }>()
</script>

<template>
  <div v-show="isVisible" class="popup-container">
    <div class="popup">
      <div v-if="gameStatus === 'win'">
        <h2>Поздравляю, вы победили! 😃</h2>
      </div>
      <div v-else>
        <h2>Вы проиграли. 😕</h2>
        <h3>...имя: {{ word }}</h3>
      </div>
      <button @click="emit('restart')">Сыграть еще раз</button>
    </div>
  </div>
</template>

<style scoped>

</style>