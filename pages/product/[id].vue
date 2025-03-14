<template>
  <div class="container mx-auto px-4 py-8">
    <UBreadcrumb v-if="product" :links="breadcrumbLinks" />

    <div v-if="pending" class="flex justify-center items-center h-64">
      <UIcon name="i-heroicons-arrow-path" class="h-8 w-8" />
    </div>

    <div
      v-else-if="error"
      class="text-red-500 p-4 border border-red-200 rounded-lg"
    >
      An error occurred while loading the product.
    </div>

    <div v-else-if="product" class="pt-8">
      <ProductDetailView :product="product" />
    </div>

    <div v-else class="text-center p-8">Product not found.</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { navigateTo } from '#app'
import type { Product } from '~/types/product'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const productId = parseInt(route.params.id as string)

const {
  data: product,
  pending,
  error
} = await useFetch<Product>(`https://fakestoreapi.com/products/${productId}`)

// SEO metadata based on the product
useHead(() => ({
  title: product.value
    ? ` TechStyle - ${product.value.title}`
    : 'Product Details',
  meta: [
    {
      name: 'description',
      content: product.value?.description || 'Product details page'
    },
    {
      property: 'og:title',
      content: product.value
        ? `${product.value.title} - TechStyle`
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

const breadcrumbLinks = computed(() => {
  if (!product.value) return []

  return [
    {
      label: 'Home',
      icon: 'i-heroicons-home',
      to: '/'
    },
    {
      label: product.value.category,
      icon: 'i-heroicons-tag',
      click: () => {
        if (product.value) {
          const selectedCategories = useState<string[]>('selectedCategories')
          selectedCategories.value = [product.value.category]

          navigateTo(
            {
              path: '/',
              query: { category: product.value.category }
            },
            { replace: true }
          )
        }
      }
    }
  ]
})
</script>
