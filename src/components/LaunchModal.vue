<script setup lang="ts">
import { ref, watch } from 'vue'
import { format } from 'date-fns'
import { Launch } from '../types/launch'

const props = defineProps<{
  launch: Launch
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const showVideo = ref(false)

const formatDate = (dateString: string): string => {
  return format(new Date(dateString), 'dd/MM/yyyy')
}

watch(
  () => props.isOpen,
  (isOpen) => {
    if (!isOpen) {
      showVideo.value = false
    }
  },
)

const closeModal = () => {
  emit('close')
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeModal()
  }
}

// eventlistener
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }
  },
)
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 transition-opacity"
    :class="{ 'opacity-100': isOpen, 'opacity-0': !isOpen }"
    @click="closeModal"
  >
    <div
      class="bg-primary-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <!-- Header with mission patch and name -->
      <div class="p-6 border-b border-primary-700 flex items-center justify-between">
        <div class="flex items-center">
          <img
            v-if="launch.links.patch?.small"
            :src="launch.links.patch.small"
            :alt="`${launch.name} mission patch`"
            class="w-12 h-12 mr-4"
          />
          <h2 class="text-2xl font-bold">{{ launch.name }}</h2>
        </div>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-white focus:outline-none"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mission details -->
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Left column -->
          <div>
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2 text-accent-500">Détails du Lancement</h3>
              <div class="grid grid-cols-2 gap-2">
                <div class="text-gray-400">Date:</div>
                <div>{{ formatDate(launch.date_utc) }}</div>

                <div class="text-gray-400">Status:</div>
                <div>
                  <span
                    class="px-2 py-1 rounded-full text-xs font-medium"
                    :class="{
                      'bg-success-500': launch.success === true,
                      'bg-error-500': launch.success === false,
                      'bg-warning-500': launch.success === undefined,
                    }"
                  >
                    {{
                      launch.success === true
                        ? 'Success'
                        : launch.success === false
                          ? 'Failed'
                          : 'Upcoming'
                    }}
                  </span>
                </div>

                <div class="text-gray-400">Site de lancement :</div>
                <div>{{ launch.launchpad?.name || 'Unknown' }}</div>

                <div class="text-gray-400">>Fusée :</div>
                <div>{{ launch.rocket?.name || 'Unknown' }}</div>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2 text-accent-500">Description de la Mission</h3>
              <p v-if="launch.details" class="text-gray-300">{{ launch.details }}</p>
              <p v-else class="text-gray-400 italic">Pas de détails disponibles</p>
            </div>

            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2 text-accent-500">Liens Externes</h3>
              <div class="flex space-x-4">
                <a
                  v-if="launch.links.article"
                  :href="launch.links.article"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-400 hover:text-blue-300"
                >
                  Article
                </a>
                <a
                  v-if="launch.links.wikipedia"
                  :href="launch.links.wikipedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-400 hover:text-blue-300"
                >
                  Wikipedia
                </a>
                <a
                  v-if="launch.links.webcast"
                  :href="launch.links.webcast"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-400 hover:text-blue-300"
                >
                  Diffusion
                </a>
              </div>
            </div>
          </div>

          <!-- Right column -->
          <div>
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2 text-accent-500">Charges Utiles</h3>
              <div v-if="launch.payloads && launch.payloads.length > 0">
                <div
                  v-for="(payload, index) in launch.payloads"
                  :key="payload.id"
                  class="mb-4 last:mb-0"
                >
                  <h4 class="font-medium">{{ payload.name || `Payload ${index + 1}` }}</h4>
                  <p class="text-sm text-gray-400">Type: {{ payload.type || 'Unknown' }}</p>
                  <div v-if="payload.customers && payload.customers.length > 0">
                    <p class="text-sm text-gray-400 mt-1">Clients :</p>
                    <ul class="list-disc list-inside text-sm text-gray-300 ml-2">
                      <li v-for="(customer, i) in payload.customers" :key="i">{{ customer }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <p v-else class="text-gray-400 italic">Pas d'information sur les charges utiles</p>
            </div>

            <div v-if="launch.links.youtube_id" class="mb-6">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold text-accent-500">Vidéo du Lancement</h3>
                <label class="flex items-center cursor-pointer">
                  <span class="mr-2 text-sm text-gray-400">Afficher la vidéo</span>
                  <div class="relative">
                    <input type="checkbox" v-model="showVideo" class="sr-only" />
                    <div class="w-10 h-5 bg-primary-700 rounded-full shadow-inner"></div>
                    <div
                      class="dot absolute w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out"
                      :class="{ 'translate-x-5': showVideo }"
                      style="top: 0.125rem; left: 0.125rem"
                    ></div>
                  </div>
                </label>
              </div>

              <div v-if="showVideo" class="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  :src="`https://www.youtube.com/embed/${launch.links.youtube_id}`"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="w-full h-full"
                ></iframe>
              </div>
              <div
                v-else
                class="aspect-video bg-primary-700 rounded-lg flex items-center justify-center cursor-pointer"
                @click="showVideo = true"
              >
                <div class="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-12 w-12 mx-auto text-accent-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p class="mt-2 text-accent-500">Cliquez pour charger la vidéo YouTube</p>
                </div>
              </div>
            </div>

            <div v-if="launch.failures && launch.failures.length > 0" class="mb-6">
              <h3 class="text-lg font-semibold mb-2 text-accent-500">Informations sur l'Échec</h3>
              <div
                v-for="(failure, index) in launch.failures"
                :key="index"
                class="bg-error-500 bg-opacity-20 p-4 rounded-lg"
              >
                <p class="font-medium">Temps : T+{{ failure.time }}s</p>
                <p v-if="failure.altitude">Altitude: {{ failure.altitude }}km</p>
                <p>Raison : {{ failure.reason }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add transitions for the modal */
.transition-opacity {
  transition-property: opacity;
  transition-duration: 300ms;
}
</style>
