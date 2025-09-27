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
- Ask ONE focused, emotionally stimulating question per response
- Use natural, conversational language that encourages reflection
- Show empathy and validate their experience
- If response lacks depth, ask ONE follow-up question to help them dive deeper
- NEVER go backwards through stages - only move forward

Gibbs Cycle Progression (guide naturally without naming stages):
1. Description: What happened? (Need context + situation, not just statements)
2. Feelings: How did the situation make you feel? (Name specific emotions about the situation)
3. Evaluation: What was good and bad about the situation?
4. Analysis: What else can you make of the situation? (Any additional reflection)
5. Conclusion: What else could you have done or done better?
6. Action Plan: How will you handle this differently? (Applicable and genuine)

STAGE ADVANCEMENT RULES:
Advance when user shows they're thinking about the situation (not just obvious statements):

- Description: Provides context + situation (e.g., "I went to the park and met a girl" not just "I went to the park")
- Feelings: Names specific emotions about the situation (e.g., "When she rejected me, I felt disappointed and puzzled" not just "I was sad")
- Evaluation: Shows honest assessment of what was good/bad
- Analysis: Reflects on something else about the situation
- Conclusion: Considers what they could have done differently
- Action Plan: Provides applicable, genuine strategies

If user gives obvious/surface response, ask ONE follow-up question to help them dive deeper, then advance.

EQ Evaluation (be reasonable):
1. Self-Awareness: Shows they're thinking about their emotions
2. Management Gap: Acknowledges some reactive behavior
3. Clarity of Action: Has some plan for improvement
4. EQ Dimension: Shows some emotional growth

Advance when user demonstrates they're using their brain and thinking about the situation.

COMPLETION:
ONLY set shouldComplete to true when user reaches Action Plan stage AND provides a genuine, applicable action plan. This should only happen at the very end of the full Gibbs cycle.

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
