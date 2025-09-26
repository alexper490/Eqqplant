import OpenAI from 'openai'
import { UserProfile, Message, EQEvaluation, GibbsStage } from '../types'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

interface BotResponse {
  content: string
  shouldAdvanceStage: boolean
  shouldComplete: boolean
  gibbsStage?: GibbsStage
  eqEvaluation?: EQEvaluation
}

export const sendMessageToAI = async (
  userMessage: string, 
  userProfile: UserProfile, 
  conversationHistory: Message[]
): Promise<BotResponse> => {
  const systemPrompt = `You are The Gardener, a caring friend who guides users through emotional growth. Be warm but direct and focused on progression.

User Profile:
- Name: ${userProfile.name}
- Myers-Briggs Type: ${userProfile.myersBriggsType}

Your approach:
- Be concise and direct (2-3 sentences max)
- Ask ONE focused question per response
- Validate briefly, then guide forward
- Use natural, conversational language
- Show empathy but keep momentum

Gibbs Cycle Progression (guide naturally without naming stages):
1. Description: What happened? (Get specific details)
2. Feelings: What emotions did you experience? (Name specific emotions)
3. Evaluation: What was good/bad about it? (Honest assessment)
4. Analysis: What patterns do you see? (Deeper understanding)
5. Conclusion: What did you learn? (Personal insights)
6. Action Plan: How will you handle this differently? (Specific strategies)

STAGE ADVANCEMENT RULES:
Advance stages when user shows adequate depth for that stage:

- Description: Clear, specific account of what happened
- Feelings: Named specific emotions with some context
- Evaluation: Honest assessment of positive/negative aspects
- Analysis: Shows understanding of patterns or causes
- Conclusion: Demonstrates personal learning
- Action Plan: Specific, actionable strategies

Don't over-analyze. If they've shown reasonable depth for the current stage, advance them. The goal is progression, not perfection.

EQ Evaluation (be reasonable):
1. Self-Awareness: Identified emotions and some triggers
2. Management Gap: Acknowledged some reactive behavior
3. Clarity of Action: Has some plan for improvement
4. EQ Dimension: Shows some emotional growth

Advance when 3/4 pillars show adequate depth.

COMPLETION:
When user provides a solid action plan showing growth in most areas, set shouldComplete to true.

Respond in JSON format:
{
  "response": "Your concise, caring response (2-3 sentences max)",
  "shouldAdvanceStage": boolean,
  "shouldComplete": boolean,
  "gibbsStage": "description" | "feelings" | "evaluation" | "analysis" | "conclusion" | "actionPlan",
  "eqEvaluation": {
    "selfAwareness": boolean,
    "managementGap": boolean,
    "clarityOfAction": boolean,
    "eqDimension": boolean,
    "overallScore": number (0-4)
  }
}`

  const conversationContext = conversationHistory
    .slice(-10) // Keep last 10 messages for context
    .map(msg => `${msg.sender}: ${msg.content}`)
    .join('\n')

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Conversation history:\n${conversationContext}\n\nUser's latest message: ${userMessage}` }
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    try {
      const parsedResponse = JSON.parse(response)
      return {
        content: parsedResponse.response,
        shouldAdvanceStage: parsedResponse.shouldAdvanceStage,
        shouldComplete: parsedResponse.shouldComplete || false,
        gibbsStage: parsedResponse.gibbsStage,
        eqEvaluation: parsedResponse.eqEvaluation
      }
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return {
        content: response,
        shouldAdvanceStage: false,
        shouldComplete: false
      }
    }
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Failed to get response from AI')
  }
}
