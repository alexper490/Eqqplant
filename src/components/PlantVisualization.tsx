import React from 'react'
import { PlantStage, GibbsStage } from '../types'

interface PlantVisualizationProps {
  stage: PlantStage
  gibbsStage?: GibbsStage
}

const PlantVisualization: React.FC<PlantVisualizationProps> = ({ stage, gibbsStage }) => {
  const getPlantImage = () => {
    // Map Gibbs stages to plant stages
    if (gibbsStage) {
      switch (gibbsStage) {
        case 'description':
          return '🌱' // seed
        case 'feelings':
          return '🌿' // sprout
        case 'evaluation':
          return '🌾' // stem
        case 'analysis':
          return '🌳' // leaves
        case 'conclusion':
          return '🌺' // bud
        case 'actionPlan':
          return '🌸' // blossom
        default:
          return '🌱'
      }
    }
    
    // Fallback to stage-based progression
    switch (stage) {
      case 'seed':
        return '🌱'
      case 'sprout':
        return '🌿'
      case 'stem':
        return '🌾'
      case 'leaves':
        return '🌳'
      case 'bud':
        return '🌺'
      case 'blossom':
        return '🌸'
      default:
        return '🌱'
    }
  }

  const getStageDescription = () => {
    if (gibbsStage) {
      switch (gibbsStage) {
        case 'description':
          return 'Sharing what happened'
        case 'feelings':
          return 'Exploring your emotions'
        case 'evaluation':
          return 'Reflecting on the experience'
        case 'analysis':
          return 'Understanding deeper meaning'
        case 'conclusion':
          return 'Learning from the situation'
        case 'actionPlan':
          return 'Planning for the future'
        default:
          return 'Growing through reflection'
      }
    }
    
    switch (stage) {
      case 'seed':
        return 'Planting the seed of reflection'
      case 'sprout':
        return 'First insights emerging'
      case 'stem':
        return 'Building emotional awareness'
      case 'leaves':
        return 'Developing deeper understanding'
      case 'bud':
        return 'Preparing for growth'
      case 'blossom':
        return 'Emotional intelligence flourishing'
      default:
        return ''
    }
  }

  const getGibbsStageIndicator = () => {
    if (!gibbsStage) return null
    
    const stages: GibbsStage[] = ['description', 'feelings', 'evaluation', 'analysis', 'conclusion', 'actionPlan']
    const currentIndex = stages.indexOf(gibbsStage)
    
    return (
      <div className="gibbs-indicator">
        <div className="gibbs-stage-name">
          {gibbsStage.charAt(0).toUpperCase() + gibbsStage.slice(1).replace(/([A-Z])/g, ' $1')}
        </div>
        <div className="gibbs-progress">
          {stages.map((s, index) => (
            <div 
              key={s}
              className={`gibbs-dot ${s === gibbsStage ? 'active' : ''} ${index < currentIndex ? 'completed' : ''}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="plant-container">
      <div className="plant-display">
        <div className={`plant-image stage-${stage}`}>
          {getPlantImage()}
        </div>
        <div className="stage-description">
          <h3>{getStageDescription()}</h3>
          {getGibbsStageIndicator()}
        </div>
      </div>
    </div>
  )
}

export default PlantVisualization
