import { auth } from '@clerk/nextjs'
import TranslationComponent from '@/components/TranslationComponent'

export default async function Home() {
  const { userId } = auth()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Google Translate Clone
      </h1>
      <TranslationComponent userId={userId} />
    </div>
  )
} 