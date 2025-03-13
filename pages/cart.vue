<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Shopping Cart</h1>

    <div
      v-if="cartItems.length === 0"
      class="text-center p-12 rounded-lg bg-white"
    >
      <UIcon
        name="i-heroicons-shopping-cart"
        class="h-12 w-12 mx-auto text-gray-400"
      />
      <h2 class="text-xl font-medium mt-4">Your cart is empty</h2>
      <p class="text-gray-500 mt-2">
        Looks like you haven't added any products to your cart yet.
      </p>
      <UButton class="mt-6" to="/" color="primary"> Continue Shopping </UButton>
    </div>

    <div v-else class="rounded-lg shadow-sm">
      <UCard>
        <div class="divide-y">
          <div
            v-for="item in cartItems"
            :key="item.product.id"
            class="py-4 flex flex-col sm:flex-row gap-4"
          >
            <!-- Product Image -->
            <div
              class="w-24 h-24 rounded flex-shrink-0 flex items-center justify-center border border-gray-100"
            >
              <NuxtImg
                :src="item.product.image"
                :alt="item.product.title"
                width="80"
                height="80"
                format="webp"
                loading="lazy"
                class="max-h-full max-w-full object-contain p-2"
              />
            </div>
            <!-- Product Details -->
            <div class="flex-1">
              <h3 class="font-medium">{{ item.product.title }}</h3>
              <UBadge class="mt-1" color="gray">{{
                item.product.category
              }}</UBadge>
              <p class="text-lg font-bold mt-2">
                ${{ item.product.price.toFixed(2) }}
              </p>
            </div>

            <!-- Quantity Controls -->
            <div class="flex items-center gap-2">
              <UButton
                icon="i-heroicons-minus"
                color="gray"
                variant="ghost"
                @click="updateQuantity(item.product.id, item.quantity - 1)"
              />

              <UInput
                v-model="item.quantity"
                type="number"
                min="1"
                class="w-16 text-center"
                :id="`quantity-${item.product.id}`"
                :name="`quantity-${item.product.id}`"
                @change="
                  updateQuantity(
                    item.product.id,
                    parseInt(item.quantity.toString())
                  )
                "
              />

              <UButton
                icon="i-heroicons-plus"
                color="gray"
                variant="ghost"
                @click="updateQuantity(item.product.id, item.quantity + 1)"
              />
            </div>

            <!-- Subtotal and Remove -->
            <div class="text-right flex flex-col items-end justify-between">
              <p class="font-bold">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </p>
              <UButton
                icon="i-heroicons-trash"
                color="red"
                variant="ghost"
                @click="removeFromCart(item.product.id)"
              />
            </div>
          </div>
        </div>

        <template #footer>
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <UButton to="/" variant="ghost" icon="i-heroicons-arrow-left">
              Continue Shopping
            </UButton>

            <div class="text-right">
              <div class="flex justify-between gap-8">
                <span class="font-medium">Subtotal:</span>
                <span class="font-bold">${{ totalPrice.toFixed(2) }}</span>
              </div>
              <UButton class="mt-4" color="primary" block @click="checkout">
                Proceed to Checkout
              </UButton>
            </div>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart'

const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart()

const checkout = () => {
  useToast().add({
    title: 'Checkout',
    description:
      'This would normally proceed to checkout, but is not implemented in this demo.',
    icon: 'i-heroicons-information-circle'
  })
}
</script>
