export const runtime = 'edge'

import { Resend } from 'resend'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { NextRequest, NextResponse } from 'next/server'

interface EmailRequestBody {
  fileName: string
  summary: string
  title: string
}

interface Env {
  SUBSCRIPTION_EMAILS: KVNamespace
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('Authorization')
  const secret = process.env.NOTIFY_API_TOKEN

  if (!authHeader || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const env = getRequestContext().env as Env
  const { fileName, summary, title } = (await req.json()) as EmailRequestBody
  const blogUrl = `https://snghaojun.com/blog/${fileName}`

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    return NextResponse.json({ error: 'Missing Email API KEY' }, { status: 500 })
  }

  const list = await env.SUBSCRIPTION_EMAILS.get('subscribers:list')
  const emails: string[] = list ? JSON.parse(list) : []

  if (emails.length === 0) {
    return NextResponse.json({ message: 'No subscribers...' }, { status: 200 })
  }

  const resend = new Resend(RESEND_API_KEY)
  const promises = emails.map((email) =>
    resend.emails.send({
      from: 'Hao Jun <mugiwara@snghaojun.com>',
      to: email,
      subject: `New Blog Post: ${title}`,
      html: `

      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #0070f3; margin-bottom: 10px;">${title}</h2>
        <p style="font-size: 16px; margin-bottom: 20px;">${summary}</p>
        <a href="${blogUrl}"
            style="display: inline-block; padding: 12px 24px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">
          Read the full article &rarr;
        </a>
        <p style="font-size: 12px; color: #999; margin-top: 30px;">You are receiving this email because you subscribed to my blog updates.<br>
          <a href="https://snghaojun.com/api/unsubscribe?email=${encodeURIComponent(email)}" style="color: #0070f3; text-decoration: underline;">
            Click here to unsubscribe 😔
          </a>
        </p>
        </div>`,
    })
  )

  await Promise.all(promises)

  return NextResponse.json({ message: `Emails sent to ${emails.length} subscribers.` })
}
