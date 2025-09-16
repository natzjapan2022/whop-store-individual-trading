"use client"

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, LogOut } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is authenticated
    const session = localStorage.getItem('userSession')
    if (session) {
      const sessionData = JSON.parse(session)
      const now = Date.now()
      if (sessionData.expiresAt > now) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem('userSession')
        setIsAuthenticated(false)
      }
    }
  }, [pathname])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleLogout = () => {
    localStorage.removeItem('userSession')
    setIsAuthenticated(false)
    router.push('/')
  }

  // Hide navigation on dashboard page
  const isDashboard = pathname === '/dashboard'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Individual Trading Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold">Individual Trading</span>
          </Link>

          {/* Desktop Navigation - Hide on dashboard */}
          {!isDashboard && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#education" className="text-sm font-medium hover:text-primary transition-colors">
                Education
              </Link>
              <Link href="#tools" className="text-sm font-medium hover:text-primary transition-colors">
                Tools
              </Link>
              <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          )}

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isDashboard && isAuthenticated ? (
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && !isDashboard && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Features
              </Link>
              <Link
                href="#education"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Education
              </Link>
              <Link
                href="#tools"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Tools
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Pricing
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Link href="/login" onClick={toggleMenu}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Sign In
                  </Button>
                </Link>
                <Link href="/pricing" onClick={toggleMenu}>
                  <Button size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}

        {/* Mobile Menu for Dashboard */}
        {isMenuOpen && isDashboard && isAuthenticated && (
          <div className="md:hidden py-4 border-t">
            <div className="flex justify-center">
              <Button onClick={handleLogout} variant="ghost" size="sm" className="w-full">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}