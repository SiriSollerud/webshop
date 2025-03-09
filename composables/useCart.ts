import { computed, watch, onMounted } from 'vue'
import type { Product } from '~/composables/useProducts'

interface CartItem {
  product: Product
  quantity: number
}

export function useCart() {
  // Use Nuxt's built-in state management
  const cartItems = useState<CartItem[]>('cart', () => [])
  const cartError = useState<string | null>('cartError', () => null)
  const isInitialized = useState<boolean>('cartInitialized', () => false)

  // Initialize cart from localStorage on client-side only
  onMounted(() => {
    if (process.client && !isInitialized.value) {
      try {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          cartItems.value = JSON.parse(savedCart)
        }
        isInitialized.value = true
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e)
        cartError.value = 'Failed to load your saved cart'
      }
    }
  })

  // Watch for changes and save to localStorage
  watch(
    cartItems,
    newItems => {
      if (process.client && isInitialized.value) {
        try {
          localStorage.setItem('cart', JSON.stringify(newItems))
        } catch (e) {
          console.error('Failed to save cart to localStorage', e)
          cartError.value = 'Failed to save your cart'
        }
      }
    },
    { deep: true }
  )

  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = cartItems.value.find(
      item => item.product.id === product.id
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.value.push({ product, quantity })
    }
  }

  const removeFromCart = (productId: number) => {
    cartItems.value = cartItems.value.filter(
      item => item.product.id !== productId
    )
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const item = cartItems.value.find(item => item.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    cartItems.value = []
  }

  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)
  })

  return {
    cartItems,
    cartError,
    isInitialized,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  }
}
