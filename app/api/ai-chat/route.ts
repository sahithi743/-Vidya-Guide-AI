import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Try to call Gemini API
    try {
      const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
      if (!apiKey) {
        throw new Error('API key not configured')
      }

      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an AI career advisor and learning assistant for students. Help with career guidance, interview preparation, resume tips, and educational questions. The student asks: ${message}`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500
            }
          })
        }
      )

      if (response.ok) {
        const data = await response.json()
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate response'
        return NextResponse.json({ response: aiResponse })
      }
    } catch (error) {
      console.error('[v0] Gemini API error:', error)
    }

    // Mock responses for demo/fallback
    const mockResponses: Record<string, string> = {
      'career': 'Based on your profile analysis, I recommend focusing on system design and distributed systems. Your strong foundation in algorithms and web development positions you well for senior roles. Consider preparing for roles at companies like Google, Amazon, and Microsoft.',
      'skill': 'Your LeetCode progress is impressive! I suggest practicing more medium-level problems in graph algorithms and dynamic programming to strengthen weak areas. Aim for 200+ problems solved to be highly competitive.',
      'interview': 'For your upcoming interviews, prepare behavioral questions using the STAR method. Practice system design (design a URL shortener, distributed cache, etc.). Study microservices architecture and scaling patterns. Mock interview practice is essential.',
      'doubt': 'Feel free to explain what concept you\'re struggling with. I can help break it down into simpler parts or provide relevant resources. Common difficult topics: Dynamic Programming, Tries, Segment Trees - which interests you?',
      'resume': 'Optimize your resume with action verbs and quantifiable achievements. Highlight projects with impact metrics. Keep it to one page if you have less than 5 years experience. Include a skills section with only technologies you\'re confident about.',
      'default': 'That\'s a great question! Based on my analysis of successful candidates, here are my recommendations: 1) Build a strong portfolio with real-world projects 2) Contribute to open source 3) Network actively 4) Practice consistently'
    }

    let response = mockResponses.default
    const inputLower = message.toLowerCase()
    if (inputLower.includes('career')) response = mockResponses.career
    else if (inputLower.includes('skill')) response = mockResponses.skill
    else if (inputLower.includes('interview')) response = mockResponses.interview
    else if (inputLower.includes('doubt') || inputLower.includes('help')) response = mockResponses.doubt
    else if (inputLower.includes('resume')) response = mockResponses.resume

    return NextResponse.json({ response })
  } catch (error) {
    console.error('[v0] Error in AI chat API:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}
