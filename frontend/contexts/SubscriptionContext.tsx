'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type SubscriptionPlanType = 'free' | 'basic' | 'pro' | 'pro-plus'

interface SubscriptionFeatures {
  student: string[]
  parent: string[]
  faculty: string[]
  admin: string[]
}

interface SubscriptionPlan {
  id: SubscriptionPlanType
  name: string
  price: string
  features: SubscriptionFeatures
}

const subscriptionPlans: Record<string, SubscriptionPlan> = {
  free: {
    id: 'free',
    name: 'Free',
    price: '₹0',
    features: {
      student: ['Dashboard', 'AI Quiz', 'Courses', 'AI Mentor'],
      parent: ['Full Parent Access'],
      faculty: [],
      admin: []
    }
  },
  basic: {
    id: 'basic',
    name: 'Basic',
    price: '₹300',
    features: {
      student: ['Dashboard', 'AI Quiz', 'Courses', 'AI Mentor', 'Oral Practice', 'Code Editor', 'AI Notes', 'AI Tutor'],
      parent: ['Full Parent Access'],
      faculty: [],
      admin: []
    }
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: '₹600',
    features: {
      student: ['Dashboard', 'AI Quiz', 'Courses', 'AI Mentor', 'Oral Practice', 'Code Editor', 'AI Notes', 'AI Tutor', 'Materials', 'Grievances', 'Interview'],
      parent: ['Full Parent Access'],
      faculty: ['Full Faculty Access'],
      admin: []
    }
  },
  'pro-plus': {
    id: 'pro-plus',
    name: 'Pro Plus',
    price: '₹1000',
    features: {
      student: ['Dashboard', 'AI Quiz', 'Courses', 'AI Mentor', 'Oral Practice', 'Code Editor', 'AI Notes', 'AI Tutor', 'Materials', 'Grievances', 'Interview', 'Exams', 'MarkSheets'],
      parent: ['Full Parent Access'],
      faculty: ['Full Faculty Access'],
      admin: ['Full Admin Access']
    }
  }
}

interface SubscriptionContextType {
  currentPlan: SubscriptionPlanType
  setPlan: (plan: SubscriptionPlanType) => void
  hasFeature: (feature: string, role: 'student' | 'parent' | 'faculty' | 'admin') => boolean
  getPlanInfo: (plan: SubscriptionPlanType) => SubscriptionPlan
  canAccessRole: (role: 'student' | 'parent' | 'faculty' | 'admin') => boolean
  getRequiredPlanForFeature: (feature: string, role: 'student' | 'parent' | 'faculty' | 'admin') => SubscriptionPlanType | null
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlanType>('free')

  useEffect(() => {
    const savedPlan = localStorage.getItem('userSubscription') as SubscriptionPlanType
    if (savedPlan && ['free', 'basic', 'pro', 'pro-plus'].includes(savedPlan)) {
      setCurrentPlan(savedPlan)
    }
  }, [])

  const setPlan = (plan: SubscriptionPlanType) => {
    setCurrentPlan(plan)
    localStorage.setItem('userSubscription', plan)
  }

  const hasFeature = (feature: string, role: 'student' | 'parent' | 'faculty' | 'admin'): boolean => {
    // Profile and Notifications are always available for all logged-in users
    if (feature === 'Profile' || feature === 'Notifications') {
      return true
    }
    
    const plan = subscriptionPlans[currentPlan]
    return plan.features[role].some(planFeature => 
      planFeature.toLowerCase() === feature.toLowerCase() || 
      feature.toLowerCase().includes(planFeature.toLowerCase()) ||
      planFeature.toLowerCase().includes(feature.toLowerCase())
    )
  }

  const canAccessRole = (role: 'student' | 'parent' | 'faculty' | 'admin'): boolean => {
    const plan = subscriptionPlans[currentPlan]
    return plan.features[role].length > 0
  }

  const getRequiredPlanForFeature = (feature: string, role: 'student' | 'parent' | 'faculty' | 'admin'): SubscriptionPlanType | null => {
    const plans: SubscriptionPlanType[] = ['free', 'basic', 'pro', 'pro-plus']
    
    for (const planId of plans) {
      if (subscriptionPlans[planId].features[role].some((planFeature: string) => 
        planFeature.toLowerCase() === feature.toLowerCase() || 
        feature.toLowerCase().includes(planFeature.toLowerCase()) ||
        planFeature.toLowerCase().includes(feature.toLowerCase())
      )) {
        return planId
      }
    }
    return null
  }

  const getPlanInfo = (plan: SubscriptionPlanType): SubscriptionPlan => {
    return subscriptionPlans[plan]
  }

  return (
    <SubscriptionContext.Provider value={{
      currentPlan,
      setPlan,
      hasFeature,
      getPlanInfo,
      canAccessRole,
      getRequiredPlanForFeature
    }}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}

export { subscriptionPlans }
