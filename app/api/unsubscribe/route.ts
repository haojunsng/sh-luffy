export const runtime = 'edge'

import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  if (!email) {
    return new Response('<h1>Invalid request: Missing email</h1>', {
      headers: { 'Content-Type': 'text/html' },
      status: 400,
    })
  }

  const WORKER_SECRET_TOKEN = process.env.WORKER_SECRET_TOKEN
  const WORKER_API_URL = process.env.WORKER_API_URL

  if (!WORKER_SECRET_TOKEN || !WORKER_API_URL) {
    return new Response('<h1>Configuration error</h1>', {
      headers: { 'Content-Type': 'text/html' },
      status: 500,
    })
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
    return new Response('<h1>Failed to unsubscribe</h1>', {
      headers: { 'Content-Type': 'text/html' },
      status: 500,
    })
  }

  return new Response(
    `
    <html>
      <body>
        <h1>Unsubscribed Successfully</h1>
        <p>Your email ${email} has been removed.</p>
      </body>
    </html>
  `,
    { headers: { 'Content-Type': 'text/html' } }
  )
}
