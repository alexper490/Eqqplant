import React, { useState, useRef, useEffect } from 'react'
import { UserProfile, Message, GibbsStage } from '../types'
import { sendMessageToAI } from '../services/openaiService'

interface ChatInterfaceProps {
  userProfile: UserProfile
  onStageAdvance: () => void
  onGibbsStageChange: (stage: GibbsStage) => void
  onCompletion: () => void
  isCompleted: boolean
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ userProfile, onStageAdvance, onGibbsStageChange, onCompletion, isCompleted }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hi ${userProfile.name}! I'm so glad you're here. I'm The Gardener, and I'm here to be your gentle companion on this journey of emotional growth. I know you're an ${userProfile.myersBriggsType}, and I'll keep that in mind as we explore together.

I'd love to hear about something that happened in your day or from your past - maybe something that stirred up emotions or left you thinking. It could be anything that felt significant to you, whether it was challenging, exciting, confusing, or just... something that made you pause.

What's on your mind? I'm here to listen and help you make sense of it.`,
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || isCompleted) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const botResponse = await sendMessageToAI(inputValue.trim(), userProfile, messages)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse.content,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])

      // Update Gibbs stage if provided
      if (botResponse.gibbsStage) {
        onGibbsStageChange(botResponse.gibbsStage)
      }

      // Check if we should advance the plant stage
      if (botResponse.shouldAdvanceStage) {
        setTimeout(() => {
          onStageAdvance()
        }, 1000)
      }

      // Check if this is a completion response (AI acknowledges good action plan)
      if (botResponse.shouldComplete) {
        setTimeout(() => {
          onCompletion()
        }, 2000) // Give time to read the response
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>The Gardener</h2>
        <p>Your wise friend for emotional growth</p>
      </div>
      
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              {message.content}
            </div>
            <div className="message-time">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {isCompleted ? (
        <div className="completion-message">
          <div className="completion-content">
            <h3>🌸 Congratulations! 🌸</h3>
            <p>I'm genuinely impressed with the depth of your reflection and the thoughtful action plan you've developed. Your plant has blossomed beautifully, and I can see real growth in your emotional intelligence.</p>
            <p>This is an ongoing project to help people develop emotional intelligence. If you enjoyed this experience, I'd love to hear from you!</p>
            <p><strong>Contact:</strong> <a href="mailto:perez.alex@northeastern.edu">perez.alex@northeastern.edu</a></p>
            <p>Take a peek at the "About the logic" button to understand the reasoning behind the AI and our conversation.</p>
          </div>
        </div>
      ) : (
        <div className="input-container">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share your thoughts..."
            rows={3}
            disabled={isLoading}
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="send-button"
          >
            Send
          </button>
        </div>
      )}
    </div>
  )
}

export default ChatInterface
