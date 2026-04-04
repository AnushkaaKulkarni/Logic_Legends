'use client'

import Link from 'next/link'
import { SubscriptionPlanType } from '@/contexts/SubscriptionContext'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Sparkles, Crown, Gem, Star } from 'lucide-react'

const plans = [
  {
    id: 'free' as SubscriptionPlanType,
    name: 'Free',
    price: '₹0',
    period: '/month',
    description: 'Perfect for getting started',
    icon: Sparkles,
    features: [
      'Dashboard & Courses',
      'AI Quiz & AI Mentor',
      'Full Parent Access'
    ],
    color: 'from-gray-500 to-gray-600',
    buttonText: 'Get Started',
    buttonVariant: 'outline' as const
  },
  {
    id: 'basic' as SubscriptionPlanType,
    name: 'Basic',
    price: '₹300',
    period: '/month',
    description: 'Great for individual learners',
    icon: Crown,
    features: [
      'Everything in Free, plus:',
      'Oral Practice & Code Editor',
      'AI Notes & AI Tutor'
    ],
    color: 'from-blue-500 to-blue-600',
    buttonText: 'Enroll Now',
    buttonVariant: 'default' as const
  },
  {
    id: 'pro' as SubscriptionPlanType,
    name: 'Pro',
    price: '₹600',
    period: '/month',
    description: 'Best for serious students',
    icon: Gem,
    features: [
      'Everything in Basic, plus:',
      'Materials & Grievances',
      'Interview Preparation',
      'Full Faculty Access'
    ],
    color: 'from-purple-500 to-purple-600',
    buttonText: 'Enroll Now',
    buttonVariant: 'default' as const,
    popular: true
  },
  {
    id: 'pro-plus' as SubscriptionPlanType,
    name: 'Pro Plus',
    price: '₹1000',
    period: '/month',
    description: 'Complete learning solution',
    icon: Star,
    features: [
      'Everything in Pro, plus:',
      'Advanced Exam System',
      'Automated MarkSheets',
      'Full Admin Access'
    ],
    color: 'from-orange-500 to-orange-600',
    buttonText: 'Enroll Now',
    buttonVariant: 'default' as const
  }
]

export default function SubscriptionPage() {
  const handlePlanSelect = (planId: SubscriptionPlanType) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedPlan', planId)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <Link href="/" className="inline-flex items-center justify-center gap-2 font-bold text-2xl group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary shadow-sm hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900 tracking-tight">Skillify<span className="text-primary">AI</span></span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Choose Your Learning Journey
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Select the perfect plan that fits your learning needs and unlock powerful AI-powered educational features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 items-stretch">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <Card key={plan.id} className={`relative flex flex-col p-8 transition-all duration-300 rounded-[2rem] bg-white ${
                plan.popular 
                  ? 'border-indigo-200 shadow-xl ring-4 ring-indigo-50 lg:-translate-y-4 z-10' 
                  : 'border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="flex-grow space-y-8">
                  {/* Plan Header */}
                  <div className="text-center space-y-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mx-auto shadow-sm`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                    </div>
                    <div className="pt-2">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                        <span className="text-base font-medium text-gray-500">{plan.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <ul className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                          <span className={`${feature.includes('Everything in') ? 'font-semibold text-gray-900' : 'text-gray-600 font-medium'}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button placed perfectly at bottom */}
                <div className="mt-8 pt-6 mt-auto">
                  <Link href={`/role-select?plan=${plan.id}`} className="block w-full">
                    <Button 
                      className={`w-full h-12 rounded-xl text-base font-semibold shadow-sm transition-all ${
                        plan.buttonVariant === 'default' 
                          ? 'bg-primary text-white hover:bg-primary/90 hover:shadow-md' 
                          : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      variant={plan.buttonVariant as any} // Ignore type mismatch to use custom classes fully
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Footer info */}
        <div className="text-center space-y-6">
          <p className="text-sm text-gray-500 font-medium max-w-2xl mx-auto">
            All plans include core platform features. You can upgrade or downgrade your plan at any time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm text-gray-600 font-medium">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>24/7 dedicated support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
