<template>
  <div>
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8" />
    </div>

    <div
      v-else-if="error"
      class="text-red-500 p-4 border border-red-200 rounded-lg"
    >
      {{ error }}
    </div>

    <div v-else-if="products.length === 0" class="text-center p-8">
      No products found matching your criteria.
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <!-- Use NuxtLink with prefetch-on="interaction" for hover prefetching -->
      <NuxtLink
        v-for="product in products"
        :key="product.id"
        :to="`/product/${product.id}`"
        prefetch-on="interaction"
        class="block"
      >
        <ProductCard :product="product" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Product } from '~/composables/useProducts'

defineProps<{
  products: Product[]
  isLoading: boolean
  error: string | null
}>()
</script>
