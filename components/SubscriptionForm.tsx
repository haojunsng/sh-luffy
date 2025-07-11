'use client'

import { useState } from 'react'

interface SubscribeResponse {
  message?: string
  [key: string]: unknown
}

const SubscriptionForm = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = async (e) => {
    e.preventDefault()

    const confirmation = window.confirm(`You have typed "${email}", is that correct?`)
    if (!confirmation) {
      return
    }

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
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
    <form onSubmit={handleSubscribe} className="mt-8 flex flex-row items-center space-x-2">
      <input
        type="email"
        required
        placeholder="Subscribe for updates!"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-md rounded-md border bg-white p-2 text-gray-900 placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
      />
      <button type="submit" className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800">
        Subscribe
      </button>
    </form>
  )
}

export default SubscriptionForm
