"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, ArrowLeft, Crown, Zap } from 'lucide-react'

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const plan = params.plan as string

  // Plan configuration
  const planConfig = {
    starter: {
      name: 'Starter Plan',
      price: '$100',
      productId: process.env.NEXT_PUBLIC_WHOP_STARTER_PRODUCT_ID || 'starter-product-id',
      icon: Zap,
      features: [
        'Basic Trading Strategies',
        'Market Analysis Tools',
        'Email Support',
        'Monthly Webinars'
      ]
    },
    pro: {
      name: 'Pro Plan',
      price: '$199',
      productId: process.env.NEXT_PUBLIC_WHOP_PRO_PRODUCT_ID || 'pro-product-id',
      icon: Crown,
      features: [
        'Advanced Trading Strategies',
        'Real-time Market Analysis',
        'Priority Support',
        'Weekly 1-on-1 Sessions',
        'Custom Trading Bot',
        'Exclusive Discord Access'
      ]
    }
  }

  const currentPlan = planConfig[plan as keyof typeof planConfig]

  useEffect(() => {
    if (!currentPlan) {
      router.push('/pricing')
      return
    }

    // Load Whop checkout embed using correct implementation
    const loadWhopCheckout = () => {
      const script = document.createElement('script')
      script.src = 'https://js.whop.com/static/checkout/loader.js'
      script.async = true
      script.defer = true
      script.onload = () => {
        setIsLoading(false)
        console.log('Whop checkout script loaded successfully')
      }
      script.onerror = () => {
        setError('Failed to load checkout. Please try again.')
        setIsLoading(false)
      }
      document.head.appendChild(script)
    }

    loadWhopCheckout()

    // Cleanup
    return () => {
      const script = document.querySelector('script[src="https://js.whop.com/static/checkout/loader.js"]')
      if (script) {
        document.head.removeChild(script)
      }
    }
  }, [currentPlan, router])

  if (!currentPlan) {
    return null // Will redirect
  }

  const Icon = currentPlan.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-800">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Individual Trading</span>
          </Link>

          <div className="flex items-center justify-center mb-4">
            <Link href="/pricing" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pricing
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
          <p className="text-gray-600">You're about to join thousands of successful traders</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Plan Summary */}
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className={`p-3 rounded-full ${plan === 'pro' ? 'bg-gradient-to-r from-purple-500 to-purple-700' : 'bg-gradient-to-r from-blue-500 to-blue-700'}`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl">{currentPlan.name}</CardTitle>
              <CardDescription className="text-3xl font-bold text-gray-900 mt-2">
                {currentPlan.price}
                <span className="text-sm font-normal text-gray-600"> /month</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 mb-3">What's included:</h3>
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800 text-center">
                  🔒 Secure checkout powered by Whop
                </p>
                <p className="text-xs text-green-600 text-center mt-1">
                  30-day money-back guarantee
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Whop Checkout */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                Complete your purchase securely through our payment partner
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading secure checkout...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-center h-64 flex items-center justify-center">
                  <div>
                    <p className="text-red-600 mb-4">{error}</p>
                    <Button onClick={() => window.location.reload()} variant="outline">
                      Try Again
                    </Button>
                  </div>
                </div>
              )}

              {/* Whop checkout will be embedded here */}
              <div
                data-whop-checkout-plan-id={currentPlan.productId}
                data-whop-checkout-theme="light"
                className="min-h-[400px]"
              ></div>
            </CardContent>
          </Card>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Trusted by 200+ active traders worldwide
          </p>
          <div className="flex justify-center items-center space-x-6 text-xs text-gray-400">
            <span>🔒 SSL Encrypted</span>
            <span>💳 Secure Payment</span>
            <span>↩️ 30-Day Refund</span>
            <span>⚡ Instant Access</span>
          </div>
        </div>
      </div>
    </div>
  )
}