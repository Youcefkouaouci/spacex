<script setup lang="ts">
import { format } from 'date-fns'
import type { Launch } from '../types/launch'

defineProps<{
  launches: Launch[]
}>()

const emit = defineEmits<{
  (e: 'launch-click', launch: Launch): void
}>()

const formatDate = (dateString: string): string => {
  return format(new Date(dateString), 'dd/MM/yyyy')
}

const handleLaunchClick = (launch: Launch) => {
  emit('launch-click', launch)
}
</script>

<template>
  <section class="mt-6">
    <h2 class="text-2xl font-bold mb-4">Liste des Lancements</h2>

    <div v-if="launches.length === 0" class="text-center py-8 bg-primary-800 rounded-lg">
      <p class="text-gray-400">Aucun lancement trouvé avec le filtre actuel</p>
    </div>

    <ul v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <li
        v-for="launch in launches"
        :key="launch.id"
        @click="handleLaunchClick(launch)"
        class="bg-primary-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl"
      >
        <div
          class="relative aspect-video bg-primary-700 flex items-center justify-center overflow-hidden"
        >
          <img
            v-if="launch.links.patch?.small"
            :src="launch.links.patch.small"
            :alt="`${launch.name} mission patch`"
            class="max-h-24 object-contain"
          />
          <div v-else class="text-gray-500 text-sm">Pas d'écusson</div>

          <div
            class="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium"
            :class="{
              'bg-success-500 bg-opacity-90': launch.success === true,
              'bg-error-500 bg-opacity-90': launch.success === false,
              'bg-warning-500 bg-opacity-90': launch.success === undefined,
            }"
          >
            {{
              launch.success === true ? 'Success' : launch.success === false ? 'Failed' : 'Upcoming'
            }}
          </div>
        </div>

        <div class="p-4">
          <h3 class="font-bold text-lg mb-1 line-clamp-1">{{ launch.name }}</h3>
          <p class="text-gray-400 text-sm mb-2">{{ formatDate(launch.date_utc) }}</p>
          <p v-if="launch.details" class="text-gray-300 text-sm line-clamp-2">
            {{ launch.details }}
          </p>
          <p v-else class="text-gray-400 text-sm italic">Pas de détails disponibles</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
