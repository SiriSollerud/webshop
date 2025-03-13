<template>
  <header class="bg-white sticky top-0 z-50 shadow-sm">
    <div class="container mx-auto px-4 py-4">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="font-bold text-xl">MyWebShop</NuxtLink>

          <div class="relative sm:hidden">
            <NuxtLink to="/cart" class="inline-flex">
              <UIcon name="mdi:cart-outline" class="w-6 h-6" />
              <div
                v-if="cartReady && totalItems > 0"
                class="absolute -top-1 -right-1 min-w-[20px] h-5 bg-mid-blue-700 text-white text-xs font-medium rounded-full flex items-center justify-center px-1.5"
              >
                {{ totalItems }}
              </div>
            </NuxtLink>
          </div>
        </div>
        <div class="flex-grow">
          <UInput
            v-model="searchQuery"
            placeholder="Search products..."
            icon="i-heroicons-magnifying-glass"
            aria-label="Search products"
            @keyup.enter="handleSearch"
          />
        </div>
        <div class="relative hidden sm:block">
          <NuxtLink to="/cart" class="inline-flex">
            <UIcon name="mdi:cart-outline" class="w-6 h-6" />
            <div
              v-if="cartReady && totalItems > 0"
              class="absolute -top-1 -right-1 min-w-[20px] h-5 bg-mid-blue-700 text-white text-xs font-medium rounded-full flex items-center justify-center px-1.5"
            >
              {{ totalItems }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCart } from '~/composables/useCart'
import { useSearch } from '~/composables/useSearch'

const { totalItems } = useCart()
const cartReady = ref(false)

const { searchQuery, handleSearch } = useSearch()

onMounted(() => {
  cartReady.value = true
})
</script>
