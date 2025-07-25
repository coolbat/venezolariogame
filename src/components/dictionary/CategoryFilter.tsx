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
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          selectedCategory === 'all'
            ? 'bg-white text-primary-600 shadow-lg'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
      >
        🌟 Todas
      </button>
      
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-white text-primary-600 shadow-lg'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {getCategoryEmoji(category)} {getCategoryName(category)}
        </button>
      ))}
    </div>
  )
}