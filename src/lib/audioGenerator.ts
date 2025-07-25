// 生成基本音效的Web Audio API工具
class AudioGenerator {
  private context: AudioContext | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  // 生成点击音效
  generateClickSound(): AudioBuffer | null {
    if (!this.context) return null
    
    const duration = 0.1
    const sampleRate = this.context.sampleRate
    const buffer = this.context.createBuffer(1, duration * sampleRate, sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      data[i] = Math.sin(2 * Math.PI * 800 * t) * Math.exp(-t * 20) * 0.3
    }
    
    return buffer
  }

  // 生成成功音效
  generateSuccessSound(): AudioBuffer | null {
    if (!this.context) return null
    
    const duration = 0.5
    const sampleRate = this.context.sampleRate
    const buffer = this.context.createBuffer(1, duration * sampleRate, sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      const freq1 = 523 + Math.sin(t * 10) * 50 // C5 con vibrato
      const freq2 = 659 // E5
      const freq3 = 784 // G5
      
      const note1 = Math.sin(2 * Math.PI * freq1 * t) * (t < 0.15 ? 1 : 0)
      const note2 = Math.sin(2 * Math.PI * freq2 * t) * (t >= 0.15 && t < 0.3 ? 1 : 0)
      const note3 = Math.sin(2 * Math.PI * freq3 * t) * (t >= 0.3 ? 1 : 0)
      
      data[i] = (note1 + note2 + note3) * Math.exp(-t * 2) * 0.4
    }
    
    return buffer
  }

  // 生成错误音效
  generateErrorSound(): AudioBuffer | null {
    if (!this.context) return null
    
    const duration = 0.3
    const sampleRate = this.context.sampleRate
    const buffer = this.context.createBuffer(1, duration * sampleRate, sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      const freq = 200 - t * 100 // Frecuencia descendente
      data[i] = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 5) * 0.3
    }
    
    return buffer
  }

  // 生成提示音效
  generateHintSound(): AudioBuffer | null {
    if (!this.context) return null
    
    const duration = 0.2
    const sampleRate = this.context.sampleRate
    const buffer = this.context.createBuffer(1, duration * sampleRate, sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      const freq = 440 + Math.sin(t * 30) * 100 // A4 con modulación
      data[i] = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 10) * 0.2
    }
    
    return buffer
  }

  // 生成升级音效
  generateLevelUpSound(): AudioBuffer | null {
    if (!this.context) return null
    
    const duration = 1.0
    const sampleRate = this.context.sampleRate
    const buffer = this.context.createBuffer(1, duration * sampleRate, sampleRate)
    const data = buffer.getChannelData(0)
    
    const frequencies = [261, 329, 392, 523] // C4, E4, G4, C5
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      const noteIndex = Math.floor(t * 4)
      const freq = frequencies[Math.min(noteIndex, frequencies.length - 1)]
      
      data[i] = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 1.5) * 0.3
    }
    
    return buffer
  }

  // 生成解锁音效
  generateUnlockSound(): AudioBuffer | null {
    if (!this.context) return null
    
    const duration = 0.6
    const sampleRate = this.context.sampleRate
    const buffer = this.context.createBuffer(1, duration * sampleRate, sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      const freq1 = 440 * Math.pow(2, t * 2) // Glissando ascendente
      const freq2 = 880 * Math.sin(t * 20) // Modulación
      
      data[i] = (Math.sin(2 * Math.PI * freq1 * t) * 0.6 + 
                Math.sin(2 * Math.PI * freq2 * t) * 0.4) * 
                Math.exp(-t * 2) * 0.3
    }
    
    return buffer
  }

  // 生成volteo de carta
  generateCardFlipSound(): AudioBuffer | null {
    if (!this.context) return null
    
    const duration = 0.15
    const sampleRate = this.context.sampleRate
    const buffer = this.context.createBuffer(1, duration * sampleRate, sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      const noise = (Math.random() - 0.5) * 0.1
      const tone = Math.sin(2 * Math.PI * 600 * t) * Math.exp(-t * 15)
      
      data[i] = (tone + noise) * 0.4
    }
    
    return buffer
  }

  // Reproducir buffer de audio
  playBuffer(buffer: AudioBuffer | null, volume: number = 0.7) {
    if (!this.context || !buffer) return
    
    const source = this.context.createBufferSource()
    const gainNode = this.context.createGain()
    
    source.buffer = buffer
    gainNode.gain.value = volume
    
    source.connect(gainNode)
    gainNode.connect(this.context.destination)
    
    source.start()
  }
}

export default AudioGenerator