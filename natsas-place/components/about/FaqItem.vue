<template>
  <div 
    class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
    :class="{ 'shadow-md': isOpen }"
  >
    <button
      @click="toggle"
      class="w-full px-6 py-4 flex items-center justify-between text-left"
      :aria-expanded="isOpen"
    >
      <span class="font-medium text-gray-900">{{ question }}</span>
      <Icon
        :name="isOpen ? 'ph:minus-circle' : 'ph:plus-circle'"
        :class="['transition-transform duration-300', isOpen ? 'rotate-180' : '']"
        size="24"
      />
    </button>
    
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-y-95 opacity-0"
      enter-to-class="transform scale-y-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-y-100 opacity-100"
      leave-to-class="transform scale-y-95 opacity-0"
    >
      <div v-show="isOpen" class="px-6 pb-4">
        <p class="text-gray-600">{{ answer }}</p>
        
        <!-- Feedback de utilidade -->
        <div v-if="isOpen" class="mt-4 flex items-center gap-4">
          <span class="text-sm text-gray-500">Esta resposta foi útil?</span>
          <button 
            @click.stop="handleFeedback(true)"
            class="text-sm px-3 py-1 rounded-full border hover:bg-green-50 hover:border-green-500 transition-colors"
            :class="feedback === true ? 'border-green-500 bg-green-50' : 'border-gray-200'"
          >
            Sim
          </button>
          <button 
            @click.stop="handleFeedback(false)"
            class="text-sm px-3 py-1 rounded-full border hover:bg-red-50 hover:border-red-500 transition-colors"
            :class="feedback === false ? 'border-red-500 bg-red-50' : 'border-gray-200'"
          >
            Não
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  question: string
  answer: string
}>()

const emit = defineEmits(['opened'])

const isOpen = ref(false)
const feedback = ref<boolean | null>(null)

const toggle = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    emit('opened')
  }
}

const handleFeedback = (value: boolean) => {
  feedback.value = value
  // Aqui você pode enviar o feedback para sua API
}
</script>