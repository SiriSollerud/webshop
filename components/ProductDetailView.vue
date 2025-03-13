<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-10 rounded-lg">
    <NuxtImg
      :src="product.image"
      :alt="product.title"
      width="400"
      height="400"
      format="webp"
      loading="lazy"
      class="max-h-96 max-w-full object-contain"
    />

    <div>
      <UBadge color="gray">{{ product.category }}</UBadge>
      <h1 class="text-2xl font-bold">{{ product.title }}</h1>

      <div class="font-heading text-3xl font-bold text-mid-blue-700">
        {{ product.price.toFixed(2) }}
        <span class="text-sm font-normal">kr</span>
      </div>
      <div class="flex items-center gap-1">
        <div class="flex">
          <UIcon
            v-for="i in 5"
            :key="i"
            :name="
              i <= Math.round(product.rating.rate)
                ? 'i-heroicons-star-solid'
                : 'i-heroicons-star'
            "
            class="w-4 h-4 text-dark-blue-950"
          />
        </div>
        <div class="text-sm text-dark-blue-950">
          ({{ product.rating.count }})
        </div>
      </div>

      <p class="pt-6 text-gray-700">{{ product.description }}</p>

      <div class="pt-8 flex items-center gap-4">
        <UInput
          v-model="quantity"
          type="number"
          min="1"
          class="w-20"
          id="product-quantity"
          name="product-quantity"
        />

        <UButton
          variant="action"
          icon="mdi:cart-plus"
          :ui="{
            icon: {
              base: 'w-6 h-6'
            }
          }"
          @click="addToCart"
        >
          Add to cart
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '~/composables/useCart'
import type { Product } from '~/types/product'

const props = defineProps<{
  product: Product
}>()

const quantity = ref('1')
const { addToCart: addToCartFn } = useCart()

const addToCart = () => {
  addToCartFn(props.product, parseInt(quantity.value))
  useToast().add({
    title: 'Added to cart',
    description: `${props.product.title} has been added to your cart`,
    icon: 'i-heroicons-check-circle'
  })
}
</script>
