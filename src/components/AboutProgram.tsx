import React, { useState } from 'react'

const AboutProgram: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        type="button"
        className="about-program-button"
        onClick={() => setIsOpen(true)}
      >
        About this program
      </button>

      {isOpen && (
        <div className="about-program-overlay" onClick={() => setIsOpen(false)}>
          <div className="about-program-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            
            <h2>About Eqqplant</h2>
            
            <div className="program-section">
              <h3>🎯 My Mission</h3>
              <p>Eqqplant is designed to help people develop emotional intelligence through guided reflection. I believe that understanding and managing our emotions is crucial for personal growth, better relationships, and overall well-being.</p>
            </div>

            <div className="program-section">
              <h3>🧠 The Benefits of Improving EQ</h3>
              <p>Emotional intelligence isn't just a buzzword—it's a fundamental skill that impacts every aspect of our lives:</p>
              <ul>
                <li><strong>Better Relationships:</strong> Understanding emotions helps us connect more deeply with others</li>
                <li><strong>Improved Decision-Making:</strong> Emotional awareness leads to more thoughtful choices</li>
                <li><strong>Enhanced Communication:</strong> Recognizing emotions improves how we express ourselves</li>
                <li><strong>Stress Management:</strong> EQ skills help us navigate challenging situations</li>
                <li><strong>Personal Growth:</strong> Self-awareness is the foundation of meaningful development</li>
              </ul>
            </div>

            <div className="program-section">
              <h3>🤖 Affective Computing & AI</h3>
              <p>This program leverages cutting-edge affective computing—the intersection of technology and emotion. By combining AI with proven psychological frameworks, I create personalized experiences that adapt to your unique emotional patterns and learning style.</p>
              
              <div className="tech-explanation">
                <h4>Why AI for Emotional Growth?</h4>
                <ul>
                  <li><strong>Personalized Guidance:</strong> AI adapts to your personality type and communication style</li>
                  <li><strong>Consistent Support:</strong> Available whenever you need emotional processing</li>
                  <li><strong>Objective Analysis:</strong> Technology can identify patterns humans might miss</li>
                  <li><strong>Scalable Impact:</strong> Reaching more people with quality emotional support</li>
                </ul>
              </div>
            </div>

            <div className="program-section">
              <h3>🌱 Technology & Human Understanding</h3>
              <p>I believe technology should enhance, not replace, human connection. Eqqplant uses AI to:</p>
              <ul>
                <li>Provide a safe, non-judgmental space for emotional exploration</li>
                <li>Guide you through proven reflection techniques</li>
                <li>Help you recognize patterns in your emotional responses</li>
                <li>Support your journey toward greater self-awareness</li>
              </ul>
              <p>The goal isn't to replace human empathy, but to use technology as a bridge to deeper self-understanding and emotional growth.</p>
            </div>

            <div className="program-section">
              <h3>🔬 Research-Based Approach</h3>
              <p>My methodology is grounded in established psychological research, including Gibbs' Reflective Cycle and emotional intelligence frameworks. I combine these proven approaches with modern AI to create an effective, accessible tool for emotional development.</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AboutProgram
