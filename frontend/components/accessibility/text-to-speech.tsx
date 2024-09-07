// components/TextToSpeech.tsx

'use client';

import React, { useState } from 'react';

export default function TextToSpeech() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'shimmer' }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const data = await response.json();
      setAudioSrc(`data:audio/mp3;base64,${data.audio}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate speech. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Text to Speech</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block mb-2 font-medium">Enter text:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to convert to speech"
            rows={4}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'Generating...' : 'Generate Speech'}
        </button>
      </form>
      {audioSrc && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Generated Audio:</h3>
          <audio controls src={audioSrc} className="w-full">
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}