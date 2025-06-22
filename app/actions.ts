'use server'

import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'

export async function generateAIResponse(message: string) {
  const stream = createStreamableValue('')

  ;(async () => {
    const { textStream } = await streamText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    })

    for await (const delta of textStream) {
      stream.update(delta)
    }

    stream.done()
  })()

  return { output: stream.value }
}
