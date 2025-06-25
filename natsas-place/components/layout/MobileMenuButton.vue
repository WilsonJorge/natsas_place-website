<template>
  <button
    @click="$emit('toggle')"
    class="p-2.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:hover:bg-gray-800 dark:active:bg-gray-700 relative overflow-hidden group"
    aria-label="Menu de navegação"
  >
    <div
      class="w-6 h-6 flex flex-col justify-center items-center relative z-10"
    >
      <span
        class="block w-5 h-0.5 rounded-full bg-gray-700 transition-all duration-300 ease-out dark:bg-gray-300 group-hover:w-6"
        :class="{
          'rotate-45 translate-y-1.5 w-6 bg-primary dark:bg-primary shadow-glow':
            isOpen,
        }"
      ></span>
      <span
        class="block w-5 h-0.5 rounded-full bg-gray-700 mt-1 transition-all duration-300 ease-out dark:bg-gray-300 group-hover:w-4"
        :class="{ 'opacity-0 transform scale-0': isOpen }"
      ></span>
      <span
        class="block w-5 h-0.5 rounded-full bg-gray-700 mt-1 transition-all duration-300 ease-out dark:bg-gray-300 group-hover:w-6"
        :class="{
          '-rotate-45 -translate-y-1.5 w-6 bg-primary dark:bg-primary shadow-glow':
            isOpen,
        }"
      ></span>
    </div>
    <span
      class="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
    ></span>
    <span
      class="absolute inset-0 transform scale-0 rounded-full bg-primary/20 z-0 ripple-effect"
    ></span>
    <span class="border-effect"></span>
  </button>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["toggle"]);
</script>

<style scoped>
button {
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

button:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}

.ripple-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease;
}

button:active .ripple-effect {
  transform: translate(-50%, -50%) scale(2.5);
  opacity: 1;
}

/* Border effect */
.border-effect {
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  transition: border-color 0.3s ease;
  pointer-events: none;
  z-index: 5;
}

button:hover .border-effect {
  border-color: var(--color-primary, #4f46e5);
  opacity: 0.2;
}

/* Different style for hovering effects on the bars */
button:hover span:nth-child(1) {
  transform: translateX(2px);
}

button:hover span:nth-child(3) {
  transform: translateX(-2px);
}

button:hover span {
  background-color: var(--color-primary, #4f46e5);
}

/* Shadow glow effect for active state */
.shadow-glow {
  box-shadow: 0 0 5px var(--color-primary, #4f46e5);
}

/* Fix conflicts with isOpen state */
button:hover span.rotate-45,
button:hover span.-rotate-45 {
  transform: translateX(0);
}

button:hover span.rotate-45 {
  transform: rotate(45deg) translateY(1.5px);
}

button:hover span.-rotate-45 {
  transform: rotate(-45deg) translateY(-1.5px);
}

/* Animation for open/close transitions */
@keyframes pulse {
  0% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.8;
  }
}

button[aria-expanded="true"] span {
  animation: pulse 2s infinite;
}

@media (prefers-reduced-motion: reduce) {
  button,
  button::after,
  button span,
  .ripple-effect,
  .border-effect {
    transition: none;
    animation: none;
  }

  button:hover {
    transform: none;
    box-shadow: none;
  }

  .shadow-glow {
  }
}
</style>
