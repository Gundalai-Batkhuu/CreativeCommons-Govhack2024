// app/api/transcribe/route.ts

import { NextResponse } from 'next/server';
import { SpeechToTextService } from '@/lib/voice/speech-to-text-service';

const whisperService = new SpeechToTextService();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const audioBuffer = Buffer.from(body.audio, 'base64');
    const transcription = await whisperService.transcribeAudio(audioBuffer);
    return NextResponse.json({ transcription });
  } catch (error) {
    console.error('Error processing audio:', error);
    return NextResponse.json({
      error: 'Error processing audio',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}