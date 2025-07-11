export interface Env {
  SUBSCRIPTION_EMAILS: KVNamespace
  WORKER_SECRET_TOKEN: string
}

export default {
  async fetch(request: Request, env: Env, c: ExecutionContext): Promise<Response> {
    const AUTH_TOKEN = env.WORKER_SECRET_TOKEN
    const authHeader = request.headers.get('Authorization')
    const { pathname } = new URL(request.url)

    if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
      return new Response('Unauthorized', { status: 401 })
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    if (pathname === '/api/subscribe') {
      return handleSubscribe(request, env)
    }

    if (pathname === '/api/unsubscribe') {
      return handleUnsubscribe(request, env)
    }

    return new Response('Error', { status: 404 })
  },
}

async function handleSubscribe(request: Request, env: Env): Promise<Response> {
  let email: string | undefined

  try {
    const body = (await request.json()) as { email?: string }
    email = body.email?.trim()
    if (!email) {
      return new Response('Email is required', { status: 400 })
    }
  } catch (err) {
    return new Response('Invalid JSON body', { status: 400 })
  }

  const listKey = 'subscribers:list'
  const listRaw = await env.SUBSCRIPTION_EMAILS.get(listKey)
  const emails: string[] = listRaw ? JSON.parse(listRaw) : []

  if (emails.includes(email)) {
    return new Response(JSON.stringify({ message: "You're already subscribed!" }), {
      headers: { 'Content-Type': 'application/json' },
      status: 409,
    })
  }

  emails.push(email)
  await env.SUBSCRIPTION_EMAILS.put(listKey, JSON.stringify(emails))

  return new Response(JSON.stringify({ message: 'Successfully subscribed!', email }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
}

async function handleUnsubscribe(request: Request, env: Env): Promise<Response> {
  let email: string | undefined

  try {
    const body = (await request.json()) as { email?: string }
    email = body.email?.trim()
    if (!email) {
      return new Response('Email is required', { status: 400 })
    }
  } catch (err) {
    return new Response('Invalid JSON body', { status: 400 })
  }

  const listKey = 'subscribers:list'
  const listRaw = await env.SUBSCRIPTION_EMAILS.get(listKey)
  const emails: string[] = listRaw ? JSON.parse(listRaw) : []

  const updatedEmails = emails.filter((e) => e !== email)
  await env.SUBSCRIPTION_EMAILS.put(listKey, JSON.stringify(updatedEmails))

  return new Response(JSON.stringify({ message: 'Successfully unsubscribed!', email }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
}
