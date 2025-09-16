"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Check,
  X,
  Crown,
  Zap,
  Shield,
  Users,
  BookOpen,
  BarChart3
} from 'lucide-react'
import Image from 'next/image'

export default function PricingPage() {

  const handlePurchase = (plan: string) => {
    // Redirect to dedicated checkout page
    window.location.href = `/checkout/${plan}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
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
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Banner Section */}
        <div className="text-center mb-12">
          <Image
            src="/banner.png"
            alt="Individual Trading Banner"
            width={800}
            height={300}
            className="w-full max-w-4xl mx-auto rounded-xl shadow-2xl object-cover"
          />
        </div>

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Trading Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get access to professional trading tools, education, and community support. Start your journey to profitable trading today.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Starter Plan */}
          <Card className="relative border-2 border-gray-200 hover:border-blue-300 transition-colors">
            <CardHeader className="text-center pb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Starter Access</CardTitle>
              <CardDescription className="text-base mt-2">
                Perfect for beginners starting their trading journey
              </CardDescription>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">$100</span>
                <span className="text-gray-600 ml-2">one-time</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                className="w-full mb-6"
                size="lg"
                onClick={() => handlePurchase('starter')}
              >
                Get Starter Access
              </Button>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">What&apos;s included:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Basic trading education course</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Community forum access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Weekly market updates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Basic risk management tools</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Email support</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <X className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>1-on-1 coaching sessions</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <X className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>Advanced analytics tools</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <X className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="relative border-2 border-blue-500 hover:border-blue-600 transition-colors">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                <Crown className="h-4 w-4 mr-1" />
                Most Popular
              </span>
            </div>
            <CardHeader className="text-center pb-8 pt-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                  <Crown className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Pro Access</CardTitle>
              <CardDescription className="text-base mt-2">
                For serious traders who want complete access
              </CardDescription>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">$199</span>
                <span className="text-gray-600 ml-2">one-time</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                className="w-full mb-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                size="lg"
                onClick={() => handlePurchase('pro')}
              >
                Get Pro Access
              </Button>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Everything in Starter, plus:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Complete trading masterclass</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">1-on-1 coaching sessions (3 sessions)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Advanced analytics dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Daily market analysis</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">VIP community access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Exclusive trading strategies</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Monthly group calls</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Comparison */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Individual Trading?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Education</h3>
              <p className="text-gray-600">
                Learn from traders with 15+ years of experience in real market conditions.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600">
                Join a community of successful traders and share strategies and insights.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-gray-600">
                95% success rate with documented results and testimonials from our members.
              </p>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">30-Day Money Back Guarantee</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;re confident in our training program. If you&apos;re not completely satisfied within 30 days,
              we&apos;ll refund your purchase - no questions asked.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}