'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase-browser'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  // Function to check authentication status
  const checkAuthStatus = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        throw error
      }

      if (session?.user) {
        setUser(session.user)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('[AuthContext] Error checking authentication:', error)
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial authentication check
  useEffect(() => {
    console.log('[AuthContext] Component mounted')
    let mounted = true

    const initialize = async () => {
      try {
        if (mounted) {
          await checkAuthStatus()
        }
      } catch (error) {
        console.error('[AuthContext] Initialization error:', error)
        if (mounted) {
          setIsAuthenticated(false)
          setIsLoading(false)
        }
      }
    }

    initialize()

    return () => {
      mounted = false
      console.log('[AuthContext] Component unmounting')
    }
  }, [])

  // Handle storage events for multi-tab support
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      console.log('[AuthContext] Storage changed:', { key: e.key })
      if (e.key === 'auth') {
        checkAuthStatus()
      }
    }

    const handleVisibilityChange = () => {
      console.log('[AuthContext] Visibility changed:', { state: document.visibilityState })
      if (document.visibilityState === 'visible') {
        checkAuthStatus()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Dummy login - accepts any credentials
    console.log('[AuthContext] Login called with:', email)
    try {
      setIsLoading(true)
      
      // Create a mock user object that matches Supabase User type
      const mockUser = {
        id: 'dummy-user-id-123',
        email: email,
        aud: 'authenticated',
        role: 'authenticated',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        app_metadata: {},
        user_metadata: {},
      } as User

      console.log('[AuthContext] Setting mock user:', mockUser)
      setUser(mockUser)
      setIsAuthenticated(true)
      console.log('[AuthContext] Login successful, returning success')
      return { success: true }

      // Real Supabase login (currently commented out)
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password
      // })
      // if (error) {
      //   return { success: false, error: error.message }
      // }
      // if (data.user) {
      //   setUser(data.user)
      //   setIsAuthenticated(true)
      //   return { success: true }
      // }
      // return { success: false, error: 'Invalid credentials' }
    } catch (error: any) {
      console.error('[AuthContext] Login error:', error)
      return { success: false, error: error.message || 'An error occurred during login' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('[AuthContext] Logout error:', error)
        return false
      }

      // Clear auth state after successful signout
      setUser(null)
      setIsAuthenticated(false)
      
      // Use router.replace to prevent back navigation
      router.replace('/login')
      
      return true
    } catch (error) {
      console.error('[AuthContext] Logout error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        throw error
      }

      if (data.user) {
        // Note: The user will not be fully authenticated until they verify their email
        return true
      }
      return false
    } catch (error) {
      console.error('[AuthContext] Signup error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}