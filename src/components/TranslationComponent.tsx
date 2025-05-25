import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline'

interface TranslationComponentProps {
  userId?: string | null
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
]

export default function TranslationComponent({ userId }: TranslationComponentProps) {
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('es')
  const [autoDetect, setAutoDetect] = useState(true)

  const handleTranslate = async () => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLang: autoDetect ? 'auto' : sourceLang,
          targetLang,
          userId,
        }),
      })

      const data = await response.json()
      setTranslatedText(data.translatedText)
    } catch (error) {
      console.error('Translation error:', error)
    }
  }

  const switchLanguages = () => {
    if (!autoDetect) {
      const temp = sourceLang
      setSourceLang(targetLang)
      setTargetLang(temp)
      setSourceText(translatedText)
      setTranslatedText(sourceText)
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={autoDetect}
              onChange={setAutoDetect}
              className={`${
                autoDetect ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Auto detect language</span>
              <span
                className={`${
                  autoDetect ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <span className="text-sm text-gray-600">Auto detect</span>
          </div>
          
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            disabled={autoDetect}
            className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          <button
            onClick={switchLanguages}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowsRightLeftIcon className="h-5 w-5 text-gray-600" />
          </button>

          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Enter text to translate"
            className="w-full h-48 p-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <textarea
            value={translatedText}
            readOnly
            placeholder="Translation will appear here"
            className="w-full h-48 p-4 bg-gray-50 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleTranslate}
          disabled={!sourceText}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Translate
        </button>
      </div>
    </div>
  )
} 