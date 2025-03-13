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

    <div
      v-else-if="products.length === 0"
      class="text-center p-8 flex flex-col gap-8"
    >
      <h3 class="font-heading text-2xl">
        We did not find any products matching that search
      </h3>
      <p class="font-thin">Please search again.</p>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
    >
      <div v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{
  products: Product[]
  isLoading: boolean
  error: string | null
}>()
</script>
