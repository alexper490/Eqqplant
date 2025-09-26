import React, { useState } from 'react'

const AboutLogic: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        className="about-logic-button"
        onClick={() => setIsOpen(true)}
      >
        About the logic
      </button>

      {isOpen && (
        <div className="about-logic-overlay" onClick={() => setIsOpen(false)}>
          <div className="about-logic-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            
            <h2>How Eqqplant Works</h2>
            
            <div className="logic-section">
              <h3>🌱 The Reflection Process</h3>
              <p>I guide you through a natural reflection journey without using clinical terms. I help you explore:</p>
              <ul>
                <li><strong>What happened</strong> - Sharing your experience</li>
                <li><strong>How you felt</strong> - Exploring your emotions</li>
                <li><strong>What you learned</strong> - Understanding the deeper meaning</li>
                <li><strong>How to grow</strong> - Planning for the future</li>
              </ul>
              
              <div className="gibbs-explanation">
                <h4>About Gibbs' Reflective Cycle</h4>
                <p>This process is based on Gibbs' Reflective Cycle, a proven framework for deep learning and personal growth. While I never mention it directly in our conversation, I naturally guide you through its six stages:</p>
                <ol>
                  <li><strong>Description</strong> - What happened in the situation</li>
                  <li><strong>Feelings</strong> - What emotions and thoughts you experienced</li>
                  <li><strong>Evaluation</strong> - What was good and bad about the experience</li>
                  <li><strong>Analysis</strong> - Making sense of the situation and understanding why it happened</li>
                  <li><strong>Conclusion</strong> - What you learned about yourself and the situation</li>
                  <li><strong>Action Plan</strong> - How you'll handle similar situations in the future</li>
                </ol>
                <p>This structured approach helps ensure genuine reflection rather than surface-level thinking.</p>
              </div>
            </div>

            <div className="logic-section">
              <h3>📊 Measuring Emotional Growth</h3>
              <p>Your plant grows when you demonstrate genuine emotional intelligence through four key pillars:</p>
              
              <div className="pillar">
                <h4>1. Self-Awareness</h4>
                <p>You identify specific emotions and what triggered them. Instead of "I was mad," you might say "I felt frustrated when my colleague interrupted me."</p>
              </div>

              <div className="pillar">
                <h4>2. Management Gap</h4>
                <p>You acknowledge where your response wasn't ideal. For example: "I interrupted them back instead of listening first."</p>
              </div>

              <div className="pillar">
                <h4>3. Clarity of Action</h4>
                <p>You create a specific plan: "Next time I feel frustrated when interrupted, I'll take a breath and ask them to finish their thought before responding."</p>
              </div>

              <div className="pillar">
                <h4>4. EQ Dimension</h4>
                <p>Your insight focuses on either internal techniques (breathing, mindfulness) or relational skills (asking questions, validation).</p>
              </div>
            </div>

            <div className="logic-section">
              <h3>🌿 Plant Growth</h3>
              <p>Your plant grows through 6 stages as you progress through reflection. Each stage represents deeper emotional understanding and growth.</p>
            </div>

            <div className="logic-section">
              <h3>💝 My Approach</h3>
              <p>I'm designed to be your caring, empathetic friend - not a clinical therapist. I validate your feelings, show genuine curiosity about your experience, and gently guide you toward deeper self-understanding.</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AboutLogic
