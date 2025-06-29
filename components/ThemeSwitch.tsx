'use client'

import { Fragment, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from '@headlessui/react'

const ChibiLuffy = ({ mode }: { mode: 'light' | 'dark' | 'system' }) => {
  const getMessage = () => {
    switch (mode) {
      case 'light':
        return 'Light Mode!'
      case 'dark':
        return 'Dark Mode!'
      case 'system':
        return 'Auto!'
      default:
        return 'Light Mode!'
    }
  }

  return (
    <div className="group relative">
      {/* Speech Bubble */}
      <div className="absolute -top-8 left-1/2 z-10 -translate-x-1/2 transform rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-medium whitespace-nowrap text-gray-700 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
        {getMessage()}
        {/* Speech bubble tail */}
        <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-4 border-r-4 border-l-4 border-transparent border-t-white dark:border-t-gray-800"></div>
      </div>

      {/* Chibi Luffy Image */}
      <div className="relative h-15 w-15 transition-transform duration-200 group-hover:animate-bounce">
        <img
          src="/static/images/chibi-luffy.png"
          alt="Chibi Luffy"
          className="h-full w-full object-contain"
          onError={(e) => {
            // Fallback to CSS version if image fails to load
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            target.nextElementSibling?.classList.remove('hidden')
          }}
        />
      </div>
    </div>
  )
}

const Blank = () => <div className="h-8 w-8" />

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center">
          <MenuButton
            aria-label="Theme switcher"
            className="group relative cursor-pointer rounded-lg p-1 transition-all duration-200"
            title="Toggle theme (Light/Dark/System)"
          >
            {mounted ? (
              <ChibiLuffy mode={resolvedTheme === 'dark' ? 'dark' : 'light'} />
            ) : (
              <Blank />
            )}
            {/* Subtle indicator */}
            <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 transform rounded-full bg-gray-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-500"></div>
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="ring-opacity-5 absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-hidden dark:bg-gray-800">
            <RadioGroup value={theme} onChange={setTheme}>
              <div className="p-1">
                <Radio value="light">
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        className={`${focus ? 'bg-primary-600 text-white' : ''} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <div className="mr-2 text-lg">☀️</div>
                        Light
                      </button>
                    )}
                  </MenuItem>
                </Radio>
                <Radio value="dark">
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        className={`${
                          focus ? 'bg-primary-600 text-white' : ''
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <div className="mr-2 text-lg">🌙</div>
                        Dark
                      </button>
                    )}
                  </MenuItem>
                </Radio>
                <Radio value="system">
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        className={`${
                          focus ? 'bg-primary-600 text-white' : ''
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <div className="mr-2 text-lg">⚙️</div>
                        System
                      </button>
                    )}
                  </MenuItem>
                </Radio>
              </div>
            </RadioGroup>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}

export default ThemeSwitch
