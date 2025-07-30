'use client'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'expression': return 'Expresiones'
      case 'food': return 'Comida'
      case 'person': return 'Personas'
      case 'festival': return 'Festivales'
      default: return category
    }
  }

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'expression': return '💬'
      case 'food': return '🍽️'
      case 'person': return '👤'
      case 'festival': return '🎉'
      default: return '🔤'
    }
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
          selectedCategory === 'all'
            ? 'bg-primary-500 text-white shadow-lg hover:bg-primary-600'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm'
        }`}
      >
        🌟 Todas
      </button>
      
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-primary-500 text-white shadow-lg hover:bg-primary-600'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm'
          }`}
        >
          {getCategoryEmoji(category)} {getCategoryName(category)}
        </button>
      ))}
    </div>
  )
}