import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, targetLanguage, sourceLanguage = 'en' } = await req.json()

    if (!text || !targetLanguage) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: text and targetLanguage' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Using Google Translate API (free tier available)
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`
    )

    if (!response.ok) {
      throw new Error('Translation service unavailable')
    }

    const data = await response.json()
    
    // Google Translate returns a complex array structure
    // Extract the translated text from the response
    let translatedText = ''
    if (data && data[0]) {
      translatedText = data[0].map((item: any) => item[0]).join('')
    }

    return new Response(
      JSON.stringify({ 
        translatedText,
        sourceLanguage,
        targetLanguage,
        originalText: text
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Translation error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Translation failed. Please try again.',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})