'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

interface ValidationErrors {
  email?: string
  password?: string
  profileType?: string
}

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profileType, setProfileType] = useState<'bride' | 'groom'>('groom')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    // Profile type validation
    if (!profileType) {
      newErrors.profileType = 'Please select your profile type'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            profile_type: profileType
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error

      if (data.user) {
        router.push(`/app/create-${profileType}-profile`)
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      setErrors({ password: error.message || 'Failed to sign up' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-md mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Profile for</Label>
              <RadioGroup
                value={profileType}
                onValueChange={(value: 'bride' | 'groom') => setProfileType(value)}
                className="flex gap-4"
                disabled={isLoading}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="groom" id="groom" />
                  <Label htmlFor="groom">Groom</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bride" id="bride" />
                  <Label htmlFor="bride">Bride</Label>
                </div>
              </RadioGroup>
              {errors.profileType && (
                <p className="text-sm text-red-500">{errors.profileType}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Login here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}