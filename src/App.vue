<script setup lang="ts">
import TitrePrincipale from './components/TitrePrincipale.vue'
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
          <button @click="fetchData" class="btn btn-primary">Retry</button>
        </div>
      </div>
    </main>
  </div>
</template>
