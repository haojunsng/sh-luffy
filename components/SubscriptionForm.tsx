'use client'

import { useState } from 'react'

const SubscriptionForm = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()

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
        className="w-full max-w-md rounded-md border p-2"
      />
      <button type="submit" className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800">
        Subscribe
      </button>
    </form>
  )
}

export default SubscriptionForm
