'use client'

import { useEffect, useState } from 'react'

export default function TestIframePage() {
  const [debugLog, setDebugLog] = useState<string[]>(['Iframe loading...'])
  const [debugEnabled, setDebugEnabled] = useState(false)

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    const logMessage = `[${timestamp}] ${message}`
    setDebugLog(prev => [...prev.slice(-19), logMessage]) // Keep last 20 messages
    console.log(`[Parent] ${message}`)
  }

  const clearLog = () => {
    setDebugLog(['Log cleared...'])
  }

  const reloadIframe = () => {
    addLog('Reloading iframe...')
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement
    if (iframe) {
      iframe.src = iframe.src
    }
  }

  const toggleDebug = () => {
    const newDebugState = !debugEnabled
    setDebugEnabled(newDebugState)
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'toggleDebug',
        enabled: newDebugState
      }, '*')
    }
    addLog(`Debug ${newDebugState ? 'enabled' : 'disabled'}`)
  }

  useEffect(() => {
    // Listen for messages from iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return
      }
      addLog(`Message from iframe: ${JSON.stringify(event.data)}`)
    }

    window.addEventListener('message', handleMessage)
    addLog('🚀 Test page loaded. Waiting for iframe...')

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  const handleIframeLoad = () => {
    addLog('✅ Iframe loaded successfully')
    
    // Try to check iframe content after a delay
    setTimeout(() => {
      try {
        const iframe = document.getElementById('game-iframe') as HTMLIFrameElement
        const iframeDoc = iframe?.contentDocument
        if (iframeDoc) {
          addLog(`✅ Iframe content accessible. Title: "${iframeDoc.title}"`)
          const buttons = iframeDoc.querySelectorAll('button, a[href]')
          addLog(`Found ${buttons.length} clickable elements`)
        } else {
          addLog('⚠️ Iframe content not accessible (same-origin policy)')
        }
      } catch (error) {
        addLog(`❌ Error accessing iframe content: ${(error as Error).message}`)
      }
    }, 1000)
  }

  const handleIframeError = () => {
    addLog('❌ Iframe failed to load')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          🧪 Venezolario Iframe Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Test Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
            <li>Look for the 🐛 debug button in the bottom-right corner of the iframe</li>
            <li>Click buttons in the iframe and watch the console/debug output</li>
            <li>Check the log below for any errors or messages</li>
            <li>Test different iframe scenarios with the controls below</li>
          </ol>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={reloadIframe}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              🔄 Reload Iframe
            </button>
            <button 
              onClick={toggleDebug}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors"
            >
              🐛 Toggle Debug
            </button>
            <button 
              onClick={clearLog}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
            >
              🗑️ Clear Log
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">📊 Debug Log:</h3>
          <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-48 overflow-y-auto">
            {debugLog.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">🎮 Game Iframe:</h3>
          <iframe 
            id="game-iframe"
            src="/"
            title="Venezolario Game"
            className="w-full h-[700px] border-2 border-gray-300 rounded-lg shadow-lg"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      </div>
    </div>
  )
}