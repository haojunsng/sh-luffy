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
                <h2>${title}</h2>
                <p>${summary}</p>
                <p>Read more: <a href="${blogUrl}">Click here!</a></p>`,
    })
  )

  await Promise.all(promises)

  return NextResponse.json({ message: `Emails sent to ${emails.length} subscribers.` })
}
