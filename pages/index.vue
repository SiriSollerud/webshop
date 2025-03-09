<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Sidebar with categories -->
      <div class="w-full lg:w-64 shrink-0">
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">Categories</h3>
          </template>
          <div class="space-y-2">
            <UButton
              v-for="category in categories"
              :key="category"
              :color="selectedCategory === category ? 'primary' : 'gray'"
              variant="ghost"
              block
              @click="filterByCategory(category)"
            >
              {{ category }}
            </UButton>
            <UButton
              v-if="selectedCategory"
              color="gray"
              variant="ghost"
              block
              @click="clearCategoryFilter"
            >
              Clear filters
            </UButton>
          </div>
        </UCard>

        <UCard class="mt-4">
          <template #header>
            <h3 class="text-lg font-semibold">Search</h3>
          </template>
          <UInput
            v-model="searchQuery"
            placeholder="Search products..."
            icon="i-heroicons-magnifying-glass"
            id="product-search"
            name="product-search"
          />
        </UCard>
      </div>

      <div class="flex-1 bg-white p-4 rounded-lg">
        <div v-if="isLoading" class="flex justify-center items-center h-64">
          <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8" />
        </div>

        <div
          v-else-if="error"
          class="text-red-500 p-4 border border-red-200 rounded-lg"
        >
          {{ error }}
        </div>

        <ProductGrid
          v-else
          :products="filteredProducts"
          :is-loading="false"
          :error="null"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  keepalive: true,
  layout: 'default',
  title: 'Products'
})

// SEO metadata
useHead({
  title: 'Products - MyWebShop',
  meta: [
    {
      name: 'description',
      content: 'Browse our collection of products at MyWebShop'
    },
    { property: 'og:title', content: 'Products - MyWebShop' },
    {
      property: 'og:description',
      content: 'Browse our collection of products at MyWebShop'
    },
    { property: 'og:type', content: 'website' }
  ]
})

import { ref, computed } from 'vue'
import { useProducts } from '~/composables/useProducts'
import type { Product } from '~/composables/useProducts'

const searchQuery = ref('')

const {
  products,
  categories,
  isLoading,
  error,
  selectedCategory,
  filterByCategory,
  clearCategoryFilter
} = useProducts()

// Filter products based on search query
const filteredProducts = computed(() => {
  if (!products.value || !searchQuery.value) return products.value || []

  const query = searchQuery.value.toLowerCase()
  return products.value.filter(
    (product: Product) =>
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
  )
})
</script>
