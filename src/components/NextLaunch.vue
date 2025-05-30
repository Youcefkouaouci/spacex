<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { format } from 'date-fns'
import { Launch } from '../types/launch'

// Déclaration des props
const props = defineProps<{
  launch: Launch
}>()

const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
})

const countdownInterval = ref<number | null>(null)

const launchDate = computed(() => {
  return new Date(props.launch.date_utc)
})

const formattedLaunchDate = computed(() => {
  return format(launchDate.value, 'dd/MM/yyyy HH:mm:ss')
})

//  mettre à jour le compte à rebours
const updateCountdown = () => {
  const now = new Date().getTime()
  const launchTime = launchDate.value.getTime()
  const distance = launchTime - now

  if (distance < 0) {
    // Si la date de lancement est passée, réinitialiser le compte à rebours à 0
    countdown.value = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }

    if (countdownInterval.value) {
      clearInterval(countdownInterval.value)
      countdownInterval.value = null
    }

    return
  }

  // Calculer les jours, heures, minutes et secondes restantes
  countdown.value = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  }
}

// onMounted(() => {
//   updateCountdown()
//   countdownInterval.value = setInterval(updateCountdown, 1000)
// })
onMounted(() => {
  updateCountdown()
  countdownInterval.value = window.setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value)
  }
})
</script>

<template>
  <section class="container-card">
    <h2 class="text-2xl font-bold mb-4 text-center">Prochain Lancement</h2>

    <div class="flex flex-col items-center">
      <h3 class="text-xl md:text-2xl font-semibold mb-2 text-accent-500">
        {{ launch.name }}
      </h3>

      <p class="text-gray-300 mb-4">Prévu pour le {{ formattedLaunchDate }}</p>

      <div class="grid grid-cols-4 gap-2 md:gap-4 w-full max-w-lg mt-2">
        <div class="countdown-item">
          <div class="text-2xl md:text-3xl font-bold text-accent-500">
            {{ countdown.days }}
          </div>
          <div class="text-xs uppercase text-gray-400">Jours</div>
        </div>

        <div class="countdown-item">
          <div class="text-2xl md:text-3xl font-bold text-accent-500">
            {{ countdown.hours }}
          </div>
          <div class="text-xs uppercase text-gray-400">Heures</div>
        </div>

        <div class="countdown-item">
          <div class="text-2xl md:text-3xl font-bold text-accent-500">
            {{ countdown.minutes }}
          </div>
          <div class="text-xs uppercase text-gray-400">Minutes</div>
        </div>

        <div class="countdown-item">
          <div class="text-2xl md:text-3xl font-bold text-accent-500">
            {{ countdown.seconds }}
          </div>
          <div class="text-xs uppercase text-gray-400">Secondes</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* .countdown-item {
  @apply flex flex-col items-center justify-center bg-primary-700 rounded-lg p-3 text-center;
} */
</style>
