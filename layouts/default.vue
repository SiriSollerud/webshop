<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="font-bold text-xl">MyWebShop</NuxtLink>

          <UButton
            to="/cart"
            color="black"
            variant="solid"
            icon="i-heroicons-shopping-cart"
          >
            <span>Cart</span>
            <UBadge
              v-if="cartReady && totalItems > 0"
              color="primary"
              class="ml-2"
            >
              {{ totalItems }}
            </UBadge>
          </UButton>
        </div>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer class="bg-white py-6 border-t border-gray-200">
      <div class="container mx-auto px-4">
        <div class="text-center text-gray-600">
          <p>
            © {{ new Date().getFullYear() }} MyWebShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCart } from '~/composables/useCart'

const { totalItems } = useCart()
const cartReady = ref(false)

// Only show cart items count after hydration is complete
onMounted(() => {
  cartReady.value = true
})
</script>
