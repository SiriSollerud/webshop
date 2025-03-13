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

  // Calculate score for a single field and term
  const getMatchScore = (text: string, term: string): number => {
    if (!text) return 0

    const lowerText = text.toLowerCase()

    // Exact match
    if (lowerText === term) return 100

    // Word boundary match (whole word)
    // Using indexOf and checking for word boundaries is faster than regex
    const wordBoundaryMatch = ` ${lowerText} `.includes(` ${term} `)
    if (wordBoundaryMatch) return 50

    // Substring match
    if (lowerText.includes(term)) return 30

    return 0
  }

  // Optimized search with weighted relevance
  const searchProducts = <T extends { title: string; description: string }>(
    items: T[],
    query: string
  ): T[] => {
    if (!query.trim()) return items

    // Prepare search terms once
    const searchTerms = query.trim().toLowerCase().split(/\s+/)

    // Early return for empty search
    if (searchTerms.length === 0) return items

    // Score calculation constants
    const TITLE_WEIGHT = 1
    const DESCRIPTION_WEIGHT = 0.1

    // Calculate scores in a single pass
    const scoredItems = items.map(item => {
      let totalScore = 0

      for (const term of searchTerms) {
        // Get scores for title and description
        const titleScore = getMatchScore(item.title, term) * TITLE_WEIGHT
        const descScore =
          getMatchScore(item.description, term) * DESCRIPTION_WEIGHT

        // Use the higher score for this term
        totalScore += Math.max(titleScore, descScore)
      }

      return { item, score: totalScore }
    })

    // Filter and sort in one step to avoid extra array iterations
    return scoredItems
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item)
  }

  return {
    searchQuery,
    handleSearch,
    searchProducts
  }
}
