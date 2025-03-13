<template>
  <footer class="bg-white py-6 border-t border-gray-200">
    <div class="container mx-auto px-4">
      <div class="text-center text-gray-600">
        <p>© {{ currentYear }} TechStyle. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear())
</script>
