// app/transcribe/page.tsx

import VoiceTranscription from '@/components/accessibility/voice-transcription';

export default function TranscribePage() {
  return (
    <div>
      <h1>Audio Transcription</h1>
      <VoiceTranscription />
    </div>
  );
}