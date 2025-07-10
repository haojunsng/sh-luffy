export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'

interface SubscribeRequestBody {
  email: string
}

export async function POST(req: NextRequest) {
  const { email } = (await req.json()) as SubscribeRequestBody

  const WORKER_SECRET_TOKEN = process.env.WORKER_SECRET_TOKEN
  if (!WORKER_SECRET_TOKEN) {
    return NextResponse.json({ error: 'Missing secret token' }, { status: 500 })
  }

  const workerResponse = await fetch(
    'https://silent-truth-cf96.snghaojun18.workers.dev/subscribe',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${WORKER_SECRET_TOKEN}`,
      },
      body: JSON.stringify({ email }),
    }
  )

  const data = await workerResponse.json()
  return NextResponse.json(data)
}
