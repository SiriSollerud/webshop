<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col gap-4 py-8">
      <CategoryToggleGroup
        v-if="categories.length > 0"
        :categories="categories"
        :selectedCategories="selectedCategories"
        @toggle="toggleCategory"
        @clear="clearCategoryFilters"
      />
    </div>
    <ProductGrid
      :products="filteredProducts"
      :isLoading="pending"
      :error="error ? error.message : null"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useProductFilters } from '~/composables/useProductFilters'
import type { Product } from '~/types/product'

definePageMeta({
  layout: 'default',
  title: 'Products'
})

useHead({
  title: 'Products - TechStyle',
  meta: [
    {
      name: 'description',
      content: 'Browse our collection of products at TechStyle'
    },
    { property: 'og:title', content: 'Products - TechStyle' },
    {
      property: 'og:description',
      content: 'Browse our collection of products at TechStyle'
    },
    { property: 'og:type', content: 'website' }
  ]
})

const {
  data: products,
  pending,
  error
} = await useFetch<Product[]>('https://fakestoreapi.com/products')

const categories = computed(() => {
  if (!products.value) return []
  const categorySet = new Set<string>()
  products.value.forEach(product => categorySet.add(product.category))
  return Array.from(categorySet)
})

const {
  selectedCategories,
  toggleCategory,
  clearCategoryFilters,
  filteredProducts,
  syncFromUrl
} = useProductFilters(products)

// Sync from URL when navigating to this page
onMounted(() => {
  syncFromUrl()
})
</script>
