<template>
  <NuxtLink
    :to="`/product/${product.id}`"
    :prefetch="false"
  >
    <UCard
      :ui="{
        base: 'flex flex-col h-full',
        background: 'bg-white',
        divide: 'divide-y-0',
        ring: '',
        rounded: 'rounded-3xl',
        shadow:
          'shadow-[0px_0px_18.7px_0px_rgba] hover:shadow-[0px_0px_21.3px_0px_rgba(29,22,196,0.21)] transition-shadow duration-300',
        border: {
          base: 'border-0'
        },
        header: {
          base: 'relative pt-4',
          padding: 'px-6'
        },
        body: {
          base: 'flex-1 flex flex-col',
          padding: 'p-6'
        },
        footer: {
          padding: 'p-6 relative'
        }
      }"
    >
      <template #header>
        <div class="flex justify-center items-center h-48 w-full">
          <NuxtImg
            :src="product.image"
            :alt="product.title"
            width="200"
            height="200"
            format="webp"
            loading="lazy"
            class="max-h-48 object-contain"
          />
        </div>
      </template>

      <h3
        class="font-heading font-semibold text-base leading-tight text-gray-900"
      >
        {{ product.title }}
      </h3>

      <div class="font-heading text-xl font-bold text-mid-blue-700">
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

      <template #footer>
        <div class="flex">
          <UButton
            variant="action-icon-only"
            :ui="{
              base: 'h-12 w-12 relative z-10'
            }"
            @click.prevent="addToCart(product, 1)"
            aria-label="Add to cart"
          >
            <UIcon name="mdi:cart-plus" class="w-6 h-6" />
          </UButton>
        </div>
      </template>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'
import { useCart } from '~/composables/useCart'

const props = defineProps<{
  product: Product
}>()

const { addToCart: addToCartFn } = useCart()

const addToCart = (product: Product, quantity: number) => {
  addToCartFn(product, quantity)
  useToast().add({
    title: 'Added to cart',
    description: `${product.title} has been added to your cart`,
    icon: 'i-heroicons-check-circle'
  })
}
</script>
