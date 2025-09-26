import React, { useState } from 'react'
import { UserProfile, MyersBriggsType } from '../types'
import AboutProgram from './AboutProgram'

interface OnboardingFormProps {
  onComplete: (profile: UserProfile) => void
}

const MBTI_TYPES: MyersBriggsType[] = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
]

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete }) => {
  const [name, setName] = useState('')
  const [selectedType, setSelectedType] = useState<MyersBriggsType | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && selectedType) {
      onComplete({
        name: name.trim(),
        myersBriggsType: selectedType
      })
    }
  }

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div className="welcome-header">
          <h1>🌱 Welcome to Eqqplant</h1>
          <p>Your journey to emotional intelligence growth begins here</p>
        </div>
        
        <form onSubmit={handleSubmit} className="onboarding-form">
          <div className="form-group">
            <label htmlFor="name">What's your name?</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>What's your Myers-Briggs personality type?</label>
            <div className="mbti-grid">
              {MBTI_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`mbti-button ${selectedType === type ? 'selected' : ''}`}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={!name.trim() || !selectedType}
          >
            Start Growing 🌱
          </button>
          
          <div className="about-program-container">
            <AboutProgram />
          </div>
        </form>
      </div>
    </div>
  )
}

export default OnboardingForm
