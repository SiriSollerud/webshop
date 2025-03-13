import { computed, type Ref } from 'vue'
import { useRoute } from '#app'
import type { Product } from '~/types/product'
import { useSearch } from '~/composables/useSearch'

export function useProductFilters(products: Ref<Product[] | null>) {
  const { searchQuery, searchProducts } = useSearch()
  const selectedCategories = useState<string[]>('selectedCategories', () => [])
  const route = useRoute()

  // Function to sync state from URL - can be called explicitly when needed
  const syncFromUrl = () => {
    if (route.query.category) {
      const categoryParam = route.query.category as string
      // Handle both single category and comma-separated categories
      const categories = categoryParam.includes(',')
        ? categoryParam.split(',').map(c => decodeURIComponent(c))
        : [decodeURIComponent(categoryParam)]

      selectedCategories.value = categories
    } else if (selectedCategories.value.length > 0) {
      selectedCategories.value = []
    }
  }

  // Toggle a category in the selection
  const toggleCategory = (category: string) => {
    const index = selectedCategories.value.indexOf(category)

    if (index === -1) {
      selectedCategories.value.push(category)
    } else {
      selectedCategories.value.splice(index, 1)
    }

    // Update URL with all selected categories or remove param if none selected
    if (selectedCategories.value.length > 0) {
      updateUrlWithoutReload({
        category: selectedCategories.value
          .map(c => encodeURIComponent(c))
          .join(',')
      })
    } else {
      updateUrlWithoutReload({})
    }
  }

  // Helper function to update URL without causing page reload
  const updateUrlWithoutReload = (query: Record<string, string>) => {
    if (!process.client) return

    const newQuery = { ...route.query }

    if (query.category) {
      newQuery.category = query.category
    } else {
      delete newQuery.category
    }

    const url = new URL(window.location.href)
    url.search = ''
    Object.entries(newQuery).forEach(([key, value]) => {
      url.searchParams.set(key, value as string)
    })

    // Update URL without reload
    window.history.replaceState({}, '', url.toString())
  }

  // Clear all selected categories
  const clearCategoryFilters = () => {
    selectedCategories.value = []
    updateUrlWithoutReload({})
  }

  // Filter products based on search query and selected categories
  const filteredProducts = computed(() => {
    if (!products.value) return []

    let filtered = products.value

    // Filter by categories if any are selected
    if (selectedCategories.value.length > 0) {
      filtered = filtered.filter(product => {
        return selectedCategories.value.includes(product.category)
      })
    }

    // Use the search function from useSearch
    if (searchQuery.value) {
      filtered = searchProducts(filtered, searchQuery.value)
    }

    return filtered
  })

  return {
    searchQuery,
    selectedCategories,
    toggleCategory,
    clearCategoryFilters,
    filteredProducts,
    syncFromUrl
  }
}
