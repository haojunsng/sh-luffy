export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'

interface SubscribeRequestBody {
  email: string
  captchaToken: string
}

type CaptchaVerifyResponse = {
  success: boolean
  challenge_ts?: string
  hostname?: string
  score?: number
  action?: string
  'error-codes'?: string[]
}

export async function POST(req: NextRequest) {
  const { email, captchaToken } = (await req.json()) as SubscribeRequestBody

  if (!captchaToken) {
    return NextResponse.json({ error: 'Missing CAPTCHA token' }, { status: 400 })
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY
  const captchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${captchaToken}`,
  })

  const captchaData = (await captchaRes.json()) as CaptchaVerifyResponse
  if (!captchaData.success) {
    return NextResponse.json({ error: 'CAPTCHA failed' }, { status: 403 })
  }

  const WORKER_SECRET_TOKEN = process.env.WORKER_SECRET_TOKEN
  if (!WORKER_SECRET_TOKEN) {
    return NextResponse.json({ error: 'Missing secret token' }, { status: 500 })
  }

  const WORKER_API_URL = process.env.WORKER_API_URL + '/subscribe'
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

  const data = await workerResponse.json()
  return NextResponse.json(data)
}
