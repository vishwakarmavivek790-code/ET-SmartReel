import React, { useState, useEffect } from 'react';

export default function App() {
  const [persona, setPersona] = useState('student');
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Mock Database of AI-Generated Reels
  const reels = [
    {
      id: 1,
      title: 'RBI Keeps Repo Rate Unchanged at 6.5%',
      memeText: 'EMI stays the same! 🙌',
      studentAction: 'Review education loan options—rates are stable.',
      professionalAction:
        "Home loan EMIs won't jump. Good time to invest surplus.",
    },
    {
      id: 2,
      title: 'Tech Sector Hiring Freezes',
      memeText: 'Resume sent to the void 🕳️',
      studentAction: 'Focus on upskilling in AI and Cloud computing right now.',
      professionalAction: 'Delay job switches unless highly negotiated.',
    },
  ];

  // Auto-scroll logic
  useEffect(() => {
    if (!isPaused && !chatOpen) {
      const timer = setTimeout(() => {
        if (activeReelIndex < reels.length - 1) {
          setActiveReelIndex(activeReelIndex + 1);
        } else {
          setActiveReelIndex(0);
        }
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [activeReelIndex, isPaused, chatOpen, reels.length]);

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: 'sans-serif',
        margin: 0,
        overflow: 'hidden',
      }}
    >
      {/* LEFT SIDEBAR: Personalization Nav */}
      <div
        style={{
          width: '250px',
          padding: '20px',
          borderRight: '1px solid #333',
          backgroundColor: '#111',
        }}
      >
        <h2 style={{ color: '#E53935', marginTop: 0 }}>ET SmartReel</h2>
        <p style={{ color: '#888', fontSize: '12px' }}>AI-Native News Engine</p>

        <label style={{ display: 'block', marginTop: '30px', color: '#aaa' }}>
          I am a:
        </label>
        <select
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '5px',
            background: '#222',
            color: '#fff',
            border: '1px solid #444',
            borderRadius: '5px',
          }}
        >
          <option value="student">Student</option>
          <option value="professional">Professional</option>
        </select>
      </div>

      {/* CENTER: The Video/Reel Player */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          onClick={() => setIsPaused(!isPaused)}
          style={{
            width: '380px',
            height: '80vh',
            border: '1px solid #333',
            borderRadius: '20px',
            backgroundColor: '#1a1a1a',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {isPaused && (
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(0,0,0,0.7)',
                padding: '5px 10px',
                borderRadius: '5px',
                zIndex: 10,
              }}
            >
              ⏸️ Paused
            </div>
          )}

          <div
            style={{
              flex: 1,
              backgroundColor: '#2a2a2a',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                color: '#E53935',
                fontSize: '24px',
                marginBottom: '20px',
              }}
            >
              ▶️
            </span>
            <div
              style={{
                background: '#444',
                padding: '40px 20px',
                borderRadius: '10px',
                width: '80%',
              }}
            >
              <h2 style={{ margin: 0 }}>{reels[activeReelIndex].memeText}</h2>
              <p style={{ color: '#aaa', fontSize: '12px', marginTop: '10px' }}>
                AI Generated Visual
              </p>
            </div>
          </div>

          <div
            style={{
              height: '30%',
              padding: '20px',
              background: 'linear-gradient(transparent, #000 20%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>
              {reels[activeReelIndex].title}
            </h3>
            <div
              style={{
                background: 'rgba(76, 175, 80, 0.2)',
                borderLeft: '4px solid #4CAF50',
                padding: '10px',
                borderRadius: '0 5px 5px 0',
              }}
            >
              <p style={{ margin: 0, fontSize: '13px', color: '#fff' }}>
                <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>
                  💡 Action:{' '}
                </span>
                {persona === 'student'
                  ? reels[activeReelIndex].studentAction
                  : reels[activeReelIndex].professionalAction}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setChatOpen(!chatOpen);
            }}
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              background: '#E53935',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              fontSize: '20px',
            }}
          >
            💬
          </button>
        </div>
      </div>

      {/* RIGHT SIDEBAR: AI Chatbox */}
      {chatOpen && (
        <div
          style={{
            width: '300px',
            backgroundColor: '#111',
            borderLeft: '1px solid #333',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              padding: '15px',
              background: '#E53935',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h4 style={{ margin: 0 }}>AI News Guide</h4>
            <button
              onClick={() => setChatOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              ✖
            </button>
          </div>

          <div style={{ flex: 1, padding: '15px', overflowY: 'auto' }}>
            <div
              style={{
                background: '#222',
                padding: '12px',
                borderRadius: '10px',
                marginBottom: '10px',
                fontSize: '14px',
                border: '1px solid #333',
              }}
            >
              Hi! I'm your AI guide. You are watching news about:{' '}
              <strong>{reels[activeReelIndex].title}</strong>. What's your next
              move?
            </div>
          </div>

          <div style={{ padding: '15px', borderTop: '1px solid #333' }}>
            <input
              type="text"
              placeholder="Type your question..."
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '20px',
                border: '1px solid #444',
                background: '#222',
                color: '#fff',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
