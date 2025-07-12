'use client'

import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

interface SubscribeResponse {
  message?: string
  [key: string]: unknown
}

const PUBLIC_SITE_KEY = '6LdAOX8rAAAAAMqnZcK8gTQixrbW2smhm9zrbMvd'

const SubscriptionForm = () => {
  const [email, setEmail] = useState('')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const handleSubscribe = async (e) => {
    e.preventDefault()

    if (!captchaToken) {
      alert('Please complete CAPTCHA')
      return
    }

    const confirmation = window.confirm(`You have typed "${email}", is that correct?`)
    if (!confirmation) {
      return
    }

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, captchaToken }),
    })

    const data: SubscribeResponse = await res.json()

    if (res.ok) {
      alert(data.message || "You're subscribed!")
    } else {
      alert(data.message || 'Subscription failed.')
    }
    setEmail('')
  }

  return (
    <>
      <form onSubmit={handleSubscribe} className="mt-8 flex flex-row items-center space-x-2">
        <input
          type="email"
          required
          placeholder="What's your email?"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full max-w-md rounded-md border bg-white p-2 text-gray-900 placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
        />
        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          Subscribe
        </button>
      </form>
      <div className="mt-2 flex w-full justify-center">
        <ReCAPTCHA sitekey={PUBLIC_SITE_KEY} onChange={setCaptchaToken} />
      </div>
    </>
  )
}

export default SubscriptionForm
