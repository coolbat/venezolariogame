import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import { parseCSVCards } from '@/lib/data'

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'src/data/cards.csv')
    const csvContent = readFileSync(filePath, 'utf-8')
    const cards = parseCSVCards(csvContent)
    
    return NextResponse.json(cards)
  } catch (error) {
    console.error('Error reading cards CSV:', error)
    return NextResponse.json({ error: 'Failed to load cards' }, { status: 500 })
  }
}