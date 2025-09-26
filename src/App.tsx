import { useState } from 'react'
import OnboardingForm from './components/OnboardingForm'
import ChatInterface from './components/ChatInterface'
import PlantVisualization from './components/PlantVisualization'
import AboutLogic from './components/AboutLogic'
import { UserProfile, PlantStage, GibbsStage } from './types'
import './App.css'

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [currentStage, setCurrentStage] = useState<PlantStage>('seed')
  const [currentGibbsStage, setCurrentGibbsStage] = useState<GibbsStage>('description')
  const [isCompleted, setIsCompleted] = useState(false)

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile)
  }

  const handleStageAdvance = () => {
    const stages: PlantStage[] = ['seed', 'sprout', 'stem', 'leaves', 'bud', 'blossom']
    const currentIndex = stages.indexOf(currentStage)
    if (currentIndex < stages.length - 1) {
      const newStage = stages[currentIndex + 1]
      setCurrentStage(newStage)
      
      // Check if we've reached the final stage
      if (newStage === 'blossom') {
        setIsCompleted(true)
      }
    }
  }

  const handleCompletion = () => {
    setIsCompleted(true)
  }

  const handleGibbsStageChange = (stage: GibbsStage) => {
    setCurrentGibbsStage(stage)
  }

  if (!userProfile) {
    return <OnboardingForm onComplete={handleOnboardingComplete} />
  }

  return (
    <div className="app">
      <div className="app-container">
        <PlantVisualization 
          stage={currentStage} 
          gibbsStage={currentGibbsStage}
        />
        <ChatInterface 
          userProfile={userProfile}
          onStageAdvance={handleStageAdvance}
          onGibbsStageChange={handleGibbsStageChange}
          onCompletion={handleCompletion}
          isCompleted={isCompleted}
        />
      </div>
      {userProfile && <AboutLogic />}
    </div>
  )
}

export default App
