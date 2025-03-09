<template>
  <UCard
    class="flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow duration-200"
    @mouseenter="debouncedPrefetch"
  >
    <template #header>
      <div class="h-40 flex items-center justify-center p-4 bg-white">
        <img
          :src="product.image"
          :alt="product.title"
          class="max-h-full max-w-full object-contain"
        />
      </div>
    </template>

    <div class="flex-1 p-4">
      <h3 class="font-medium text-base line-clamp-2 mb-2">
        {{ product.title }}
      </h3>

      <!-- Rating from the actual API data -->
      <div class="flex items-center mb-3">
        <div class="flex">
          <UIcon
            v-for="i in 5"
            :key="i"
            :name="
              i <= Math.round(product.rating.rate)
                ? 'i-heroicons-star-solid'
                : 'i-heroicons-star'
            "
            class="w-4 h-4 text-yellow-400"
          />
        </div>
        <span class="ml-1 text-xs text-gray-500">
          ({{ product.rating.count }})
        </span>
      </div>
      <div class="text-xl font-bold">
        {{ product.price }}
        <span class="text-sm font-normal">kr</span>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import { type Product } from '~/composables/useProducts'

const props = defineProps<{
  product: Product
}>()

// Debounced prefetch to avoid excessive API calls
let prefetchTimeout: ReturnType<typeof setTimeout>

const debouncedPrefetch = () => {
  clearTimeout(prefetchTimeout)
  prefetchTimeout = setTimeout(() => {
    // Prefetch the API data directly
    $fetch(`https://fakestoreapi.com/products/${props.product.id}`, {
      method: 'GET',
      key: `product-${props.product.id}`
    })

    // Prefetch components
    prefetchComponents(['ProductDetailView'])
  }, 100)
}

// Clean up any pending timeouts when component is unmounted
onUnmounted(() => {
  clearTimeout(prefetchTimeout)
})
</script>
