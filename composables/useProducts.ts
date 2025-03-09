import { ref, computed } from 'vue'
import { useFetch } from '#app'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export function useProducts() {
  const selectedCategory = ref('')
  
  // Products fetch with reactive URL
  const productsUrl = computed(() => {
    return selectedCategory.value
      ? `https://fakestoreapi.com/products/category/${selectedCategory.value}`
      : 'https://fakestoreapi.com/products'
  })
  
  const { 
    data: products, 
    error: productsError, 
    refresh: refreshProducts, 
    status: productsStatus 
  } = useFetch<Product[]>(productsUrl)
  
  // Categories fetch
  const { 
    data: categories, 
    error: categoriesError, 
    status: categoriesStatus 
  } = useFetch<string[]>('https://fakestoreapi.com/products/categories')
  
  // Computed properties for UI states
  const isLoading = computed(() => 
    productsStatus.value === 'pending' || 
    categoriesStatus.value === 'pending'
  )
  
  const error = computed(() => {
    if (productsError.value) return 'Failed to fetch products'
    if (categoriesError.value) return 'Failed to fetch categories'
    return null
  })
  
  // Category filter functions
  const filterByCategory = (category: string) => {
    selectedCategory.value = category
  }
  
  const clearCategoryFilter = () => {
    selectedCategory.value = ''
  }
  
  // Product detail function
  const getProductById = (id: number) => {
    // Return the URL and key for the component to use with useFetch
    return {
      url: `https://fakestoreapi.com/products/${id}`,
      key: `product-${id}`
    }
  }
  
  return {
    products,
    categories,
    isLoading,
    error,
    selectedCategory,
    filterByCategory,
    clearCategoryFilter,
    getProductById,
    refreshProducts
  }
}