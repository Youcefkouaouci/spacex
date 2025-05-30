<script setup lang="ts">
import { onMounted, ref } from 'vue'

import TitrePrincipale from './components/TitrePrincipale.vue'
import NextLaunch from './components/NextLaunch.vue'
import { Launch } from './types/launch'
import { fetchLaunches, fetchNextLaunch } from './services/spaceXApi'

const launches = ref<Launch[]>([])
const nextLaunch = ref<Launch | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)
const currentFilter = ref<'all' | 'success' | 'failure'>('all')

const fetchData = async () => {
  isLoading.value = true
  error.value = null

  try {
    // Récupérer le prochain lancement
    const nextLaunchData = await fetchNextLaunch()
    nextLaunch.value = nextLaunchData

    // Récupérez au-delà de 10 lancements
    const launchesData = await fetchLaunches()
    launches.value = launchesData
    applyFilter(currentFilter.value)
  } catch (err) {
    error.value = 'Failed to fetch SpaceX data. Please try again later.'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="app-container">
    <TitrePrincipale />

    <main>
      <div v-if="isLoading" class="container-card flex justify-center items-center p-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500"
        ></div>
      </div>

      <div
        v-else-if="error"
        class="container-card bg-error-500 bg-opacity-20 text-white p-6 rounded-lg"
      >
        <p class="text-center">{{ error }}</p>
        <div class="flex justify-center mt-4">
          <button @click="fetchData" class="btn btn-primary">Réessayer</button>
        </div>
      </div>

      <template v-else>
        <!-- Prochain Lancement Section -->
        <NextLaunch v-if="nextLaunch" :launch="nextLaunch" />
      </template>
    </main>
  </div>
</template>
