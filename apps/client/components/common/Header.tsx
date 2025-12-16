'use client'

import {
  BarChart3,
  Bell,
  CircleDollarSign,
  FileText,
  LayoutDashboard,
  Moon,
  Search,
  Sun,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type React from 'react'
import { WalletConnectButton } from '../wallet/ConnectButton'

const navItems = [
  { name: 'Proposals', path: '/proposals', icon: FileText },
	{ name: 'Treasury', path: '/treasury', icon: <CircleDollarSign size={20} /> },
	{ name: 'Analytics', path: '/analytics', icon: <BarChart3 size={20} /> },
]

const Header = () => {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand */}
        <div className="flex items-center gap-10">
				<Link href="/">
					<span className="text-2xl font-bold">
						<span className="text-white">Au</span>
						<span className="text-purple-500">relius</span>
					</span>
				</Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ name, path, icon: Icon }) => {
              const active = pathname === path

              return (
                <Link
                  key={name}
                  href={path}
                  className={`group relative flex items-center gap-2 rounded-md px-4 py-2 text-sm transition
                    ${
                      active
                        ? 'text-white'
                        : 'text-slate-400 hover:text-white'
                    }
                  `}
                >
                  <span>{name}</span>

                  {/* Active underline */}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-1 h-[2px] rounded-full bg-indigo-500" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Search */}
		  	<WalletConnectButton />
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hidden md:flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition"
          >
            <Search size={18} />
            <span>Search</span>
            <span className="ml-1 text-xs text-slate-500">⌘K</span>
          </button>

          {/* Notifications */}
          <button className="relative rounded-md p-2 text-slate-400 hover:bg-white/5 hover:text-white transition">
            <Bell size={18} />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-indigo-500" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="rounded-md p-2 text-slate-400 hover:bg-white/5 hover:text-white transition"
          >
            {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Profile */}
          <button className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-semibold text-white">
            AU
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
