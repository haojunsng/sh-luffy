export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'

interface UnsubscribeRequestBody {
  email: string
}

interface ErrorResponse {
  error: string
  message?: string
}

export async function POST(req: NextRequest) {
  const { email } = (await req.json()) as UnsubscribeRequestBody

  const WORKER_SECRET_TOKEN = process.env.WORKER_SECRET_TOKEN
  if (!WORKER_SECRET_TOKEN) {
    return NextResponse.json({ error: 'Missing secret token' }, { status: 500 })
  }

  const WORKER_API_URL = process.env.WORKER_API_URL
  if (!WORKER_API_URL) {
    return NextResponse.json({ error: 'Missing api url' }, { status: 500 })
  }
  const workerResponse = await fetch(WORKER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${WORKER_SECRET_TOKEN}`,
    },
    body: JSON.stringify({ email }),
  })

  if (!workerResponse.ok) {
    const errorData = (await workerResponse.json()) as ErrorResponse
    return new Response(
      `
      <html>
        <body>
          <h1>Failed to unsubscribe!</h1>
          <p>${errorData.message || 'Unknown error'}</p>
        </body>
      </html>
    `,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  return new Response(
    `
    <html>
      <body>
        <h1>Unsubscribed Successfully</h1>
        <p>Your email ${email} has been removed from the subscription list.</p>
      </body>
    </html>
  `,
    { headers: { 'Content-Type': 'text/html' } }
  )
}
