<template>
  <div id="app">
    <AppHeader/>
    <div class="game-container">
      <AppDrawZone :wrongLettersCount="wrongLetters.length"/>
      <AppWrongLetters :wrongLetters="wrongLetters"/>
      <AppWord :word="word" :correctLetters="correctLetters"/>
      <AppResultPopUp :word="word" ref="popup" @restart="restart"/>
    </div>
    <AppNotification ref="notification"/>
  </div>
</template>

<script setup lang="ts">
  import AppHeader from '@/components/AppHeader.vue'
  import AppDrawZone from '@/components/AppDrawZone.vue'
  import AppWord from '@/components/AppWord.vue'
  import AppWrongLetters from '@/components/AppWrongLetters.vue'
  import AppResultPopUp from '@/components/AppResultPopUp.vue'
  import AppNotification from '@/components/AppNotification.vue'
  import { getRandomName } from '@/api/getRandomName'

  import { ref, computed, watch } from 'vue'

  let word = ref("");
  const letters = ref<string[]>([]);

  const getRandomWord = async () => {
    try{
      let name = await getRandomName()
      word.value = name.toLowerCase();
    }catch (error){
      console.log(error)
      word.value = ''
    }
  }

  getRandomWord()

  let correctLetters = computed(() => {
    return letters.value.filter(letter => word.value.includes(letter))
  })

  let wrongLetters = computed(() => {
    return letters.value.filter(letter => !word.value.includes(letter))
  })

  let isStatusLose = computed(() => wrongLetters.value.length === 6)
  let isStatusWin = computed(() => [...word.value].every(letter => correctLetters.value.includes(letter)))

  const notification = ref<InstanceType<typeof AppNotification> | null>(null)
  const popup = ref<InstanceType<typeof AppResultPopUp> | null>(null)

  watch(wrongLetters, () => {
    if (isStatusLose.value){
      popup.value?.open('lose')
    }
  })

  watch(correctLetters, () => {
    if (isStatusWin.value){
      popup.value?.open('win')
    }
  })

  let restart = async () => {
    await getRandomWord()
    letters.value = [];
    popup.value?.close()
  }

  window.addEventListener('keydown', ({key}) => {
    if (isStatusLose.value || isStatusWin.value){
      return
    }

    if(letters.value.includes(key)){
      notification.value?.open()
      setTimeout(() => {
        notification.value?.close()
      }, 2000)
      return
    }

    if(/[а-яА-Я]/.test(key)){
      letters.value.push(key.toLowerCase())
    }
  })
</script>
