export interface Env {
  MY_D1: D1Database
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

    if (pathname === '/subscribe') {
      return handleSubscribe(request, env)
    }

    if (pathname === '/unsubscribe') {
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

  try {
    // Check if they are already subscribed
    const { results } = await env.MY_D1.prepare(
      `SELECT is_unsubscribed FROM subscribers WHERE email = ?`
    )
      .bind(email)
      .all()

    if (results.length > 0 && results[0].is_unsubscribed === 0) {
      return new Response(JSON.stringify({ message: "You're already subscribed!" }), {
        headers: { 'Content-Type': 'application/json' },
        status: 409,
      })
    }

    // If it turns out they're not
    await env.MY_D1.prepare(
      `INSERT INTO subscribers (email, is_unsubscribed, unsubscribed_at, subscribed_at)
               VALUES (?, 0, NULL, CURRENT_TIMESTAMP)
               ON CONFLICT(email) DO UPDATE SET
                is_unsubscribed = 0,
                unsubscribed_at = NULL,
                subscribed_at = CURRENT_TIMESTAMP
              `
    )
      .bind(email)
      .run()
  } catch {
    return new Response('Error with D1 DB', { status: 500 })
  }

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

  try {
    // Mark unsubscriber as unsubscribed
    const result = await env.MY_D1.prepare(
      `UPDATE subscribers SET is_unsubscribed = 1, unsubscribed_at = CURRENT_TIMESTAMP WHERE email = ?
            `
    )
      .bind(email)
      .run()
  } catch (err) {
    return new Response('Error with D1 DB', { status: 500 })
  }

  return new Response(JSON.stringify({ message: 'Successfully unsubscribed!', email }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
}
