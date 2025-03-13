import { useState } from '#app'
import { useRoute, navigateTo } from '#app'

export function useSearch() {
  const searchQuery = useState<string>('searchQuery', () => '')
  const route = useRoute()

  // Handle search functionality
  const handleSearch = () => {
    // Only navigate if we're not already on the home page
    if (route.path !== '/') {
      navigateTo('/')
    }
  }

  // Search for whole words only
  const searchProducts = <T extends { title: string; description: string }>(
    items: T[],
    query: string
  ): T[] => {
    if (!query.trim()) return items

    // Create a regex that matches whole words only
    // This uses word boundaries (\b) to ensure we match complete words
    const words = query.trim().toLowerCase().split(/\s+/)

    return items.filter(item => {
      const title = item.title.toLowerCase()
      const description = item.description.toLowerCase()

      // Check if ANY of the search words appear as whole words
      return words.some(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'i')
        return regex.test(title) || regex.test(description)
      })
    })
  }

  return {
    searchQuery,
    handleSearch,
    searchProducts
  }
}