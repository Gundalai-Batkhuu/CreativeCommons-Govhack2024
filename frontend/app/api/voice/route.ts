import { NextResponse } from 'next/server';
import { TextToSpeechService } from '@/lib/voice/text-to-speech-service';

const ttsService = new TextToSpeechService();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const audioBuffer = await ttsService.generateSpeech(text);

    // Convert the buffer to base64
    const base64Audio = audioBuffer.toString('base64');

    return NextResponse.json({ audio: base64Audio });
  } catch (error) {
    console.error('Error processing text-to-speech:', error);
    return NextResponse.json({
      error: 'Error processing text-to-speech',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}