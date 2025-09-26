export type MyersBriggsType = 
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP'

export type PlantStage = 'seed' | 'sprout' | 'stem' | 'leaves' | 'bud' | 'blossom'

export type GibbsStage = 'description' | 'feelings' | 'evaluation' | 'analysis' | 'conclusion' | 'actionPlan'

export interface UserProfile {
  name: string
  myersBriggsType: MyersBriggsType
}

export interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export interface EQEvaluation {
  selfAwareness: boolean
  managementGap: boolean
  clarityOfAction: boolean
  eqDimension: boolean
  overallScore: number
}

export interface GibbsProgress {
  currentStage: GibbsStage
  completedStages: GibbsStage[]
  stageContent: Record<GibbsStage, string>
}
