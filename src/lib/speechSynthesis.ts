// 语音合成系统 - 支持委内瑞拉西班牙语发音
class SpeechSynthesisManager {
  private synth: SpeechSynthesis | null = null
  private voices: SpeechSynthesisVoice[] = []
  private isInitialized = false

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis
      this.loadVoices()
    }
  }

  private loadVoices() {
    if (!this.synth) return

    const loadVoicesList = () => {
      this.voices = this.synth!.getVoices()
      this.isInitialized = true
    }

    // 立即加载
    loadVoicesList()

    // 监听语音列表变化（某些浏览器需要）
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoicesList
    }
  }

  // 获取最适合的西班牙语语音
  private getBestSpanishVoice(): SpeechSynthesisVoice | null {
    if (!this.isInitialized || this.voices.length === 0) {
      return null
    }

    // 优先级顺序：委内瑞拉 > 其他拉美国家 > 西班牙 > 任何西班牙语
    const priorityOrder = [
      'es-VE', // 委内瑞拉
      'es-CO', // 哥伦比亚（相近口音）
      'es-MX', // 墨西哥
      'es-AR', // 阿根廷
      'es-CL', // 智利
      'es-PE', // 秘鲁
      'es-ES', // 西班牙
      'es'     // 通用西班牙语
    ]

    // 首先按地区代码查找
    for (const langCode of priorityOrder) {
      const voice = this.voices.find(voice => 
        voice.lang.toLowerCase().startsWith(langCode.toLowerCase())
      )
      if (voice) {
        return voice
      }
    }

    // 查找包含特定名称的语音（更准确）
    const namePatterns = [
      'venezolana', 'venezuelan',
      'colombia', 'mexican', 'argentina',
      'latina', 'latin american',
      'spanish', 'español', 'castellano'
    ]

    for (const pattern of namePatterns) {
      const voice = this.voices.find(voice => 
        voice.name.toLowerCase().includes(pattern) ||
        voice.lang.toLowerCase().startsWith('es')
      )
      if (voice) {
        return voice
      }
    }

    // 最后尝试任何西班牙语语音
    return this.voices.find(voice => 
      voice.lang.toLowerCase().startsWith('es')
    ) || null
  }

  // 发音委内瑞拉单词
  async speakVenezuelanWord(word: string, rate: number = 0.8): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        reject(new Error('语音合成不可用'))
        return
      }

      // 取消当前正在播放的语音
      this.synth.cancel()

      // 预处理文本以改善发音
      const processedWord = this.preprocessVenezuelanText(word)
      const utterance = new SpeechSynthesisUtterance(processedWord)
      
      // 设置语音参数
      const voice = this.getBestSpanishVoice()
      if (voice) {
        utterance.voice = voice
        console.log(`使用语音: ${voice.name} (${voice.lang})`)
      }
      
      utterance.lang = 'es-VE' // 委内瑞拉西班牙语
      utterance.rate = rate     // 语速稍慢，便于学习
      utterance.pitch = 1.0     // 正常音调
      utterance.volume = 0.8    // 音量

      // 事件监听
      utterance.onend = () => resolve()
      utterance.onerror = (event) => {
        console.warn('语音合成错误:', event.error)
        reject(new Error(`语音合成失败: ${event.error}`))
      }

      // 开始语音合成
      try {
        this.synth.speak(utterance)
      } catch (error) {
        reject(error)
      }
    })
  }

  // 预处理委内瑞拉文本以改善发音
  private preprocessVenezuelanText(text: string): string {
    let processed = text

    // 委内瑞拉特殊发音规则
    const venezuelanPronunciations: Record<string, string> = {
      // 常见委内瑞拉俚语发音调整
      'chamo': 'cha-mo',
      'chama': 'cha-ma',
      'pana': 'pa-na',
      'marico': 'ma-ri-co',
      'chevere': 'che-ve-re',
      'ladilla': 'la-di-ya',
      'jeva': 'je-va',
      'arrecho': 'a-rre-cho',
      'burda': 'bur-da',
      'fino': 'fi-no',
      'sabroso': 'sa-bro-so',
      'broma': 'bro-ma',
      'vacano': 'va-ca-no'
    }

    // 应用特殊发音
    const lowerText = processed.toLowerCase()
    for (const [word, pronunciation] of Object.entries(venezuelanPronunciations)) {
      if (lowerText.includes(word)) {
        processed = processed.replace(new RegExp(word, 'gi'), pronunciation)
      }
    }

    return processed
  }

  // 发音标准西班牙语单词（对比用）
  async speakStandardWord(word: string, rate: number = 0.8): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        reject(new Error('语音合成不可用'))
        return
      }

      this.synth.cancel()

      const utterance = new SpeechSynthesisUtterance(word)
      
      const voice = this.getBestSpanishVoice()
      if (voice) {
        utterance.voice = voice
      }
      
      utterance.lang = 'es-ES' // 标准西班牙语
      utterance.rate = rate
      utterance.pitch = 1.0
      utterance.volume = 0.8

      utterance.onend = () => resolve()
      utterance.onerror = (event) => {
        console.warn('语音合成错误:', event.error)
        reject(new Error(`语音合成失败: ${event.error}`))
      }

      try {
        this.synth.speak(utterance)
      } catch (error) {
        reject(error)
      }
    })
  }

  // 发音例句
  async speakExample(example: string, rate: number = 0.7): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        reject(new Error('语音合成不可用'))
        return
      }

      this.synth.cancel()

      const utterance = new SpeechSynthesisUtterance(example)
      
      const voice = this.getBestSpanishVoice()
      if (voice) {
        utterance.voice = voice
      }
      
      utterance.lang = 'es-VE'
      utterance.rate = rate    // 例句语速更慢
      utterance.pitch = 1.0
      utterance.volume = 0.8

      utterance.onend = () => resolve()
      utterance.onerror = (event) => {
        console.warn('语音合成错误:', event.error)
        reject(new Error(`语音合成失败: ${event.error}`))
      }

      try {
        this.synth.speak(utterance)
      } catch (error) {
        reject(error)
      }
    })
  }

  // 停止当前语音
  stop() {
    if (this.synth) {
      this.synth.cancel()
    }
  }

  // 检查语音合成是否可用
  isAvailable(): boolean {
    return !!this.synth && this.isInitialized
  }

  // 获取可用的西班牙语语音列表
  getAvailableSpanishVoices(): SpeechSynthesisVoice[] {
    return this.voices.filter(voice => 
      voice.lang.toLowerCase().startsWith('es')
    )
  }

  // 获取系统语音信息用于调试
  getVoiceInfo(): string {
    if (!this.isInitialized) {
      return '语音系统未初始化'
    }

    const spanishVoices = this.getAvailableSpanishVoices()
    const bestVoice = this.getBestSpanishVoice()
    
    return `
可用西班牙语语音: ${spanishVoices.length}个
${spanishVoices.map(v => `- ${v.name} (${v.lang})`).join('\n')}

推荐语音: ${bestVoice ? `${bestVoice.name} (${bestVoice.lang})` : '无'}
    `.trim()
  }

  // 测试语音功能
  async testSpeech(): Promise<boolean> {
    try {
      await this.speakVenezuelanWord('prueba', 1.0)
      return true
    } catch (error) {
      console.error('语音测试失败:', error)
      return false
    }
  }
}

// 创建全局实例
const speechManager = new SpeechSynthesisManager()

export default speechManager
export { SpeechSynthesisManager }