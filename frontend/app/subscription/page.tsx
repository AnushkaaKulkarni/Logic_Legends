'use client'

import Link from 'next/link'
import { SubscriptionPlanType } from '@/contexts/SubscriptionContext'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, X, Sparkles, Crown, Gem, Star } from 'lucide-react'

const plans: { id: SubscriptionPlanType; name: string; price: string; period: string; description: string; icon: any; features: { student: string[]; parent: string[]; faculty: string[]; admin: string[] }; color: string; buttonText: string; buttonVariant: 'default' | 'outline'; popular?: boolean }[] = [
  {
    id: 'free',
    name: 'Free',
    price: '₹0',
    period: '/month',
    description: 'Perfect for getting started',
    icon: Sparkles,
    features: {
      student: ['Dashboard', 'AI Quiz', 'Courses', 'AI Mentor'],
      parent: ['Full Parent Access'],
      faculty: [],
      admin: []
    },
    color: 'from-gray-500 to-gray-600',
    buttonText: 'Get Started',
    buttonVariant: 'outline'
  },
  {
    id: 'basic',
    name: 'Basic',
    price: '₹300',
    period: '/month',
    description: 'Great for individual learners',
    icon: Crown,
    features: {
      student: ['Dashboard', 'AI Quiz', 'Courses', 'AI Mentor', 'Oral Practice', 'Code Editor', 'AI Notes', 'AI Tutor'],
      parent: ['Full Parent Access'],
      faculty: [],
      admin: []
    },
    color: 'from-blue-500 to-blue-600',
    buttonText: 'Enroll Now',
    buttonVariant: 'default'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹600',
    period: '/month',
    description: 'Best for serious students',
    icon: Gem,
    features: {
      student: ['Dashboard', 'AI Quiz', 'Courses', 'AI Mentor', 'Oral Practice', 'Code Editor', 'AI Notes', 'AI Tutor', 'Materials', 'Grievances', 'Interview'],
      parent: ['Full Parent Access'],
      faculty: ['Full Faculty Access'],
      admin: []
    },
    color: 'from-purple-500 to-purple-600',
    buttonText: 'Enroll Now',
    buttonVariant: 'default',
    popular: true
  },
  {
    id: 'pro-plus',
    name: 'Pro Plus',
    price: '₹1000',
    period: '/month',
    description: 'Complete learning solution',
    icon: Star,
    features: {
      student: ['Dashboard', 'AI Quiz', 'Courses', 'AI Mentor', 'Oral Practice', 'Code Editor', 'AI Notes', 'AI Tutor', 'Materials', 'Grievances', 'Interview', 'Exams', 'MarkSheets'],
      parent: ['Full Parent Access'],
      faculty: ['Full Faculty Access'],
      admin: ['Full Admin Access']
    },
    color: 'from-orange-500 to-orange-600',
    buttonText: 'Enroll Now',
    buttonVariant: 'default'
  }
]

export default function SubscriptionPage() {
  const handlePlanSelect = (planId: SubscriptionPlanType) => {
    // Store selected plan in localStorage
    localStorage.setItem('selectedPlan', planId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <Link href="/" className="inline-flex items-center justify-center gap-2 font-bold text-2xl">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-foreground">SkillifyAI</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Choose Your Learning Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan that fits your learning needs and unlock powerful AI-powered educational features
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <Card key={plan.id} className={`relative p-8 border-2 transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-primary shadow-xl ring-4 ring-primary/20' 
                  : 'border-border hover:border-primary/40'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan Header */}
                  <div className="text-center space-y-3">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-foreground">
                        {plan.price}
                        <span className="text-lg font-normal text-muted-foreground">{plan.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Student Features</h4>
                      <div className="space-y-2">
                        {plan.features.student.length > 0 ? (
                          plan.features.student.map((feature) => (
                            <div key={feature} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-foreground">{feature}</span>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">No student features</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Parent Access</h4>
                      <div className="space-y-2">
                        {plan.features.parent.length > 0 ? (
                          plan.features.parent.map((feature) => (
                            <div key={feature} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-foreground">{feature}</span>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">No parent access</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Faculty Access</h4>
                      <div className="space-y-2">
                        {plan.features.faculty.length > 0 ? (
                          plan.features.faculty.map((feature) => (
                            <div key={feature} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-foreground">{feature}</span>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">No faculty access</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Admin Access</h4>
                      <div className="space-y-2">
                        {plan.features.admin.length > 0 ? (
                          plan.features.admin.map((feature) => (
                            <div key={feature} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-foreground">{feature}</span>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">No admin access</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href={`/role-select?plan=${plan.id}`}>
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                      variant={plan.buttonVariant}
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

        {/* Footer */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            All plans include core platform features. You can upgrade or downgrade your plan at any time.
          </p>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
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
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
