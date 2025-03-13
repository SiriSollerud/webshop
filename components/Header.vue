<template>
  <header class="bg-[#F2F1F5] sticky top-0 z-50 shadow-sm">
    <div class="container mx-auto px-4 py-4">
      <div class="flex gap-4 flex-row sm:items-center justify-between">
        <NuxtLink
          to="/"
          class="font-bold text-xl font-heading text-mid-blue-700"
          >TechStyle</NuxtLink
        >
        <div class="flex w-40 sm:w-56 flex-row gap-4">
          <UInput
            v-model="searchQuery"
            placeholder="Search..."
            icon="i-heroicons-magnifying-glass"
            aria-label="Search products"
            @keyup.enter="handleSearch"
          />
          <div class="relative">
            <NuxtLink to="/cart" class="inline-flex" aria-label="View cart">
              <UIcon name="mdi:cart-outline" class="w-6 h-6" />
              <div
                v-if="cartReady && totalItems > 0"
                class="absolute -top-2 -right-2 min-w-[20px] h-5 bg-mid-blue-700 text-white text-xs font-medium rounded-full flex items-center justify-center px-1.5"
              >
                {{ totalItems }}
              </div>
            </NuxtLink>
          </div>
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
