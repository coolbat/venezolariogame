'use client'

import { useEffect, useState } from 'react'

interface DebugInfo {
  isInIframe: boolean
  windowOrigin: string
  parentOrigin: string | null
  userAgent: string
  clickCount: number
  lastClickTime: string | null
  errors: string[]
}

export default function IframeDebugger() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    isInIframe: false,
    windowOrigin: '',
    parentOrigin: null,
    userAgent: '',
    clickCount: 0,
    lastClickTime: null,
    errors: []
  })
  const [showDebug, setShowDebug] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if we're in an iframe
    const isInIframe = window !== window.parent
    
    // Get origins
    const windowOrigin = window.location.origin
    let parentOrigin = null
    try {
      parentOrigin = window.parent.location.origin
    } catch (e) {
      parentOrigin = 'Cross-origin (restricted)'
    }

    setDebugInfo(prev => ({
      ...prev,
      isInIframe,
      windowOrigin,
      parentOrigin,
      userAgent: navigator.userAgent
    }))

    // Add global click listener
    const handleGlobalClick = (event: MouseEvent) => {
      console.log('[Debug] Global click detected:', {
        target: event.target,
        timestamp: new Date().toISOString(),
        coordinates: { x: event.clientX, y: event.clientY }
      })

      setDebugInfo(prev => ({
        ...prev,
        clickCount: prev.clickCount + 1,
        lastClickTime: new Date().toLocaleTimeString()
      }))
    }

    // Add global error listener
    const handleGlobalError = (event: ErrorEvent) => {
      const errorMsg = `${event.error?.name || 'Error'}: ${event.message}`
      console.error('[Debug] Global error:', errorMsg)
      
      setDebugInfo(prev => ({
        ...prev,
        errors: [...prev.errors.slice(-4), errorMsg] // Keep last 5 errors
      }))
    }

    document.addEventListener('click', handleGlobalClick, true)
    window.addEventListener('error', handleGlobalError)

    // Log initial state
    console.log('[Debug] IframeDebugger initialized:', {
      isInIframe,
      windowOrigin,
      parentOrigin,
      timestamp: new Date().toISOString()
    })

    return () => {
      document.removeEventListener('click', handleGlobalClick, true)
      window.removeEventListener('error', handleGlobalError)
    }
  }, [])

  // Don't show in production unless explicitly enabled
  if (process.env.NODE_ENV === 'production' && !showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        className="fixed bottom-4 right-4 z-50 bg-red-500 text-white px-2 py-1 text-xs rounded opacity-50 hover:opacity-100"
        title="Show Debug Info"
      >
        🐛
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs max-w-sm backdrop-blur-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">🐛 Debug Info</span>
        <button
          onClick={() => setShowDebug(false)}
          className="text-white/70 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-1">
        <div>
          <span className={debugInfo.isInIframe ? 'text-yellow-400' : 'text-green-400'}>
            {debugInfo.isInIframe ? '📱 In Iframe' : '🖥️ Standalone'}
          </span>
        </div>
        
        <div className="text-xs text-gray-300">
          Origin: {debugInfo.windowOrigin}
        </div>
        
        {debugInfo.isInIframe && (
          <div className="text-xs text-gray-300">
            Parent: {debugInfo.parentOrigin}
          </div>
        )}
        
        <div className="text-xs text-gray-300">
          Clicks: {debugInfo.clickCount}
          {debugInfo.lastClickTime && (
            <span> (Last: {debugInfo.lastClickTime})</span>
          )}
        </div>
        
        {debugInfo.errors.length > 0 && (
          <div className="text-xs text-red-400">
            <div>Recent Errors:</div>
            {debugInfo.errors.slice(-2).map((error, idx) => (
              <div key={idx} className="truncate">• {error}</div>
            ))}
          </div>
        )}
        
        <div className="pt-2 space-x-2">
          <button
            onClick={() => {
              console.log('[Debug] Manual test click')
              alert('Test click works!')
            }}
            className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded text-xs"
          >
            Test Click
          </button>
          
          <button
            onClick={() => {
              console.clear()
              console.log('[Debug] Console cleared')
            }}
            className="bg-gray-500 hover:bg-gray-600 px-2 py-1 rounded text-xs"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}