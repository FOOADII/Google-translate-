import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { MongoClient } from 'mongodb'

const AZURE_ENDPOINT = process.env.AZURE_TRANSLATOR_ENDPOINT
const AZURE_KEY = process.env.AZURE_TRANSLATOR_KEY
const AZURE_REGION = process.env.AZURE_TRANSLATOR_REGION
const MONGODB_URI = process.env.MONGODB_URI

export async function POST(request: Request) {
  try {
    const { text, sourceLang, targetLang, userId } = await request.json()

    // Azure Translator API request
    const response = await fetch(
      `${AZURE_ENDPOINT}/translate?api-version=3.0&from=${sourceLang}&to=${targetLang}`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_KEY!,
          'Ocp-Apim-Subscription-Region': AZURE_REGION!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ text }]),
      }
    )

    const data = await response.json()
    const translatedText = data[0]?.translations[0]?.text || ''

    // Store translation history if user is authenticated
    if (userId && MONGODB_URI) {
      const client = new MongoClient(MONGODB_URI)
      await client.connect()

      const db = client.db('translate-history')
      await db.collection('translations').insertOne({
        userId,
        sourceText: text,
        translatedText,
        sourceLang,
        targetLang,
        timestamp: new Date(),
      })

      await client.close()
    }

    return NextResponse.json({ translatedText })
  } catch (error) {
    console.error('Translation error:', error)
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    )
  }
} 