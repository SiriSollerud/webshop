<template>
  <div class="container mx-auto px-4 py-8">
    <UBreadcrumb :items="breadcrumbItems" class="mb-6" />

    <div v-if="pending" class="flex justify-center items-center h-64">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8" />
    </div>

    <div
      v-else-if="error"
      class="text-red-500 p-4 border border-red-200 rounded-lg"
    >
      An error occurred while loading the product.
    </div>

    <div v-else-if="product" class="bg-white p-6 rounded-lg shadow-sm">
      <ProductDetailView :product="product" />
    </div>

    <div v-else class="text-center p-8">Product not found.</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

import { computed } from 'vue'
import type { Product } from '~/composables/useProducts'

const route = useRoute()
const productId = parseInt(route.params.id as string)

// Use useFetch to get the product data
const {
  data: product,
  pending,
  error
} = await useFetch<Product>(`https://fakestoreapi.com/products/${productId}`, {
  key: `product-${productId}`
})

// SEO metadata based on the product
useHead(() => ({
  title: product.value
    ? `${product.value.title} - MyWebShop`
    : 'Product Details',
  meta: [
    {
      name: 'description',
      content: product.value?.description || 'Product details page'
    },
    {
      property: 'og:title',
      content: product.value
        ? `${product.value.title} - MyWebShop`
        : 'Product Details'
    },
    {
      property: 'og:description',
      content: product.value?.description || 'Product details page'
    },
    {
      property: 'og:image',
      content: product.value?.image || ''
    },
    {
      property: 'og:type',
      content: 'product'
    }
  ]
}))

const breadcrumbItems = computed(() => [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: product.value?.category || 'Category',
    to: `/?category=${product.value?.category}`
  },
  {
    label: product.value?.title || 'Product',
    to: route.fullPath
  }
])
</script>
