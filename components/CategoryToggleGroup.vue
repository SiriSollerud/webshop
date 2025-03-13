<template>
  <div
    role="group"
    aria-label="Filter by category"
    class="flex flex-wrap gap-2"
  >
    <UButton
      v-for="category in categories"
      :key="category"
      :color="isSelected(category) ? 'primary' : 'gray'"
      :variant="isSelected(category) ? 'solid' : 'solid'"
      size="sm"
      @click="toggleCategory(category)"
    >
      {{ formatCategoryName(category) }}
    </UButton>
    <UButton
      v-if="selectedCategories.length > 0"
      color="gray"
      variant="soft"
      size="sm"
      @click="clearCategories"
    >
      Clear all
    </UButton>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  categories: string[]
  selectedCategories: string[]
}>()

const emit = defineEmits<{
  (e: 'toggle', category: string): void
  (e: 'clear'): void
}>()

const isSelected = (category: string) =>
  props.selectedCategories.includes(category)

const toggleCategory = (category: string) => {
  emit('toggle', category)
}

const clearCategories = () => {
  emit('clear')
}

const formatCategoryName = (category: string) => {
  return category
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>
