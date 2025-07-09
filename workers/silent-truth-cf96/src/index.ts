export interface Env {
  SUBSCRIPTION_EMAILS: KVNamespace
  WORKER_SECRET_TOKEN: string
}

export default {
  async fetch(request: Request, env: Env, c: ExecutionContext): Promise<Response> {
    const AUTH_TOKEN = env.WORKER_SECRET_TOKEN
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
      return new Response('Unauthorized', { status: 401 })
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    let email
    try {
      const body = (await request.json()) as { email?: string }
      const email = body.email?.trim()
      if (!email) {
        return new Response('Email is required', { status: 400 })
      }
    } catch (err) {
      return new Response('Invalid JSON body', { status: 400 })
    }

    const key = `subscriber:${email}`
    const existing = await env.SUBSCRIPTION_EMAILS.get(key)
    if (existing) {
      return new Response(JSON.stringify({ message: "You're already subscribed!" }), {
        headers: { 'Content-Type': 'application/json' },
        status: 409,
      })
    }

    await env.SUBSCRIPTION_EMAILS.put(
      key,
      JSON.stringify({ email, subscribedAt: new Date().toISOString() })
    )

    return new Response(JSON.stringify({ message: 'Successfully subscribed!', email }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  },
}
