# Eqqplant - Emotional Intelligence Growth App

A React application that helps users develop emotional intelligence through guided reflection using Gibbs' Reflective Cycle, visualized through a growing plant.

## 🌱 Live Demo

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/eqqplant)

## Features

- **Personalized Onboarding**: Users input their name and Myers-Briggs personality type
- **AI-Powered Guidance**: "The Gardener" chatbot guides users through Gibbs' Reflective Cycle
- **Visual Growth**: Plant grows through 6 stages as users progress through reflection
- **EQ Evaluation**: Advanced semantic analysis to measure genuine emotional growth
- **Wise Friend Tone**: Supportive, conversational AI that adapts to user's personality

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the root directory with:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:3000`

## How It Works

### Gibbs Reflective Cycle Integration
The chatbot guides users through 6 stages:
1. **Description** - What happened?
2. **Feelings** - What were you thinking and feeling?
3. **Evaluation** - What was good and bad about the experience?
4. **Analysis** - What sense can you make of the situation?
5. **Conclusion** - What else could you have done?
6. **Action Plan** - If it arose again, what would you do?

### EQ Growth Measurement
The AI evaluates responses against 4 key pillars:

1. **Self-Awareness**: Specific emotions + triggers identified
2. **Management Gap**: Acknowledgment of flawed reactive behavior
3. **Clarity of Action**: Specific, measurable future protocol
4. **EQ Dimension**: Focus on internal or relational techniques

### Plant Growth Stages
- 🌱 **Seed**: Planting the seed of reflection
- 🌿 **Sprout**: First insights emerging
- 🌾 **Stem**: Building emotional awareness
- 🌳 **Leaves**: Developing deeper understanding
- 🌺 **Bud**: Preparing for growth
- 🌸 **Blossom**: Emotional intelligence flourishing

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **AI**: OpenAI GPT-5 Mini API
- **Styling**: CSS with smooth animations
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/
│   ├── OnboardingForm.tsx
│   ├── ChatInterface.tsx
│   ├── PlantVisualization.tsx
│   ├── AboutLogic.tsx
│   └── AboutProgram.tsx
├── services/
│   └── openaiService.ts
├── types.ts
├── App.tsx
├── App.css
└── main.tsx
```

## Development Notes

- The app uses structured output from OpenAI to evaluate EQ growth
- Plant stages advance when users demonstrate all 4 pillars of emotional growth
- Conversations are designed to be 5-10 minutes long
- The AI maintains context of the user's Myers-Briggs type throughout the conversation

## Contributing

This is a research project focused on emotional intelligence development through AI-guided reflection. Contributions and feedback are welcome!

## License

MIT License - feel free to use this project for educational and research purposes.