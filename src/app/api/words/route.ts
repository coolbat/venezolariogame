import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import { parseCSVWords } from '@/lib/data'

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'src/data/words.csv')
    const csvContent = readFileSync(filePath, 'utf-8')
    const words = parseCSVWords(csvContent)
    
    return NextResponse.json(words)
  } catch (error) {
    console.error('Error reading words CSV:', error)
    return NextResponse.json({ error: 'Failed to load words' }, { status: 500 })
  }
}