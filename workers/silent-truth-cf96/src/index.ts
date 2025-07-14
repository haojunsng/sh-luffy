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
      return jsonResponse({ error: 'Unauthorized' }, 401)
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405)
    }

    if (pathname === '/subscribe') {
      return handleSubscribe(request, env)
    }

    if (pathname === '/unsubscribe') {
      return handleUnsubscribe(request, env)
    }

    return jsonResponse({ error: 'Not found' }, 404)
  },
}

async function handleSubscribe(request: Request, env: Env): Promise<Response> {
  let email: string | undefined

  try {
    const body = (await request.json()) as { email?: string }
    email = body.email?.trim()
    if (!email) {
      return jsonResponse({ error: 'Email is required' }, 400)
    }
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400)
  }

  try {
    // Check if they are already subscribed
    const { results } = await env.MY_D1.prepare(
      `SELECT is_unsubscribed FROM subscribers WHERE email = ?`
    )
      .bind(email)
      .all()

    if (results.length > 0 && results[0].is_unsubscribed === 0) {
      return jsonResponse({ message: "You're already subscribed!" }, 409)
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
  } catch (err) {
    return jsonResponse({ error: 'Error with D1 DB' }, 500)
  }

  return jsonResponse({ message: 'Successfully subscribed!', email }, 200)
}

async function handleUnsubscribe(request: Request, env: Env): Promise<Response> {
  let email: string | undefined

  try {
    const body = (await request.json()) as { email?: string }
    email = body.email?.trim()
    if (!email) {
      return jsonResponse({ error: 'Email is required' }, 400)
    }
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400)
  }

  try {
    // Mark unsubscriber as unsubscribed
    await env.MY_D1.prepare(
      `UPDATE subscribers SET is_unsubscribed = 1, unsubscribed_at = CURRENT_TIMESTAMP WHERE email = ?`
    )
      .bind(email)
      .run()
  } catch {
    return jsonResponse({ error: 'Error with D1 DB' }, 500)
  }

  return jsonResponse({ message: 'Successfully unsubscribed!', email }, 200)
}

function jsonResponse(body: any, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
