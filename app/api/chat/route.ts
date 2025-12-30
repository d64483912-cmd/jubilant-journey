import { Mistral } from '@mistralai/mistralai'
import { NextResponse } from 'next/server'
import { getRelevantChunks } from '@/lib/rag'

const apiKey = process.env.MISTRAL_API_KEY

export async function POST(req: Request) {
  if (!apiKey) {
    return NextResponse.json({ error: 'Mistral API key not configured' }, { status: 500 })
  }

  const client = new Mistral({ apiKey })
  const { messages, mode } = await req.json()
  const lastMessage = messages[messages.length - 1].content

  try {
    const citations = await getRelevantChunks(lastMessage)
    const context = citations.map(c => `Source: Nelson Textbook, Ch ${c.chapter}, p. ${c.page}: ${c.content}`).join('\n\n')

    const systemPrompt = mode === 'academic' 
      ? `You are Nelson-GPT, a sophisticated pediatric knowledge assistant. Provide evidence-based, academic responses inspired by the Nelson Textbook of Pediatrics. Use formal medical terminology. 
      
      Use the following context from Nelson Textbook to inform your answer:
      ${context}
      
      Cite the sources using [1], [2], etc. corresponding to the context provided.`
      : `You are Nelson-GPT, a clinical pediatric assistant. Provide practical, actionable clinical guidance for healthcare professionals. Focus on diagnosis, management, and dosing.
      
      Use the following context from Nelson Textbook to inform your answer:
      ${context}
      
      Cite the sources using [1], [2], etc. corresponding to the context provided.`

    const response = await client.chat.stream({
      model: 'mistral-small-latest',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m: any) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.content
        }))
      ],
    })

    const stream = new ReadableStream({
      async start(controller) {
        // Send citations first as a special chunk
        controller.enqueue(new TextEncoder().encode(`__CITATIONS__:${JSON.stringify(citations)}__END_CITATIONS__`))
        
        for await (const chunk of response) {
          const content = chunk.data.choices[0]?.delta?.content
          if (content) {
            controller.enqueue(new TextEncoder().encode(content))
          }
        }
        controller.close()
      },
    })

    return new Response(stream)
  } catch (error) {
    console.error('Mistral API error:', error)
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}
