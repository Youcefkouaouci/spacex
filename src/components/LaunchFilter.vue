<script setup lang="ts">
// Déclare les propriétés (props) attendues depuis le composant parent
defineProps<{
  currentFilter: 'all' | 'success' | 'failure'
}>()

const emit = defineEmits<{
  (e: 'filter-change', filter: 'all' | 'success' | 'failure'): void
}>()

const handleFilterChange = (event: Event) => {
  const select = event.target as HTMLSelectElement
  emit('filter-change', select.value as 'all' | 'success' | 'failure')
}
</script>

<template>
  <section class="container-card">
    <h2 class="text-2xl font-bold mb-4">Filtrer les lancements</h2>

    <div class="flex items-center">
      <label for="launch-filter" class="mr-4 text-gray-300">Afficher :</label>
      <select
        id="launch-filter"
        :value="currentFilter"
        @change="handleFilterChange"
        class="bg-primary-900 border border-primary-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-black"
      >
        <option value="all">Tous les lancements</option>
        <option value="success">Lancements réussis</option>
        <option value="failure">Lancements échoués</option>
      </select>
    </div>
  </section>
</template>
