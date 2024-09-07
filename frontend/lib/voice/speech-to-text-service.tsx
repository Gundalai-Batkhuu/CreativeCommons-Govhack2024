import OpenAI from 'openai';

export class SpeechToTextService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async transcribeAudio(audioBuffer: Buffer): Promise<string> {
    try {
      // Create a File object directly from the buffer
      const file = new File([audioBuffer], 'audio.wav', { type: 'audio/wav' });

      const response = await this.openai.audio.transcriptions.create({
        file: file,
        model: "whisper-1",
        language: "en"
      });

      return response.text;
    } catch (error) {
      console.error('Error in transcribeAudio:', error);
      throw error;
    }
  }
}
