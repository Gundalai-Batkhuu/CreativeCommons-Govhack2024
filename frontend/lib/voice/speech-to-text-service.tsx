// app/services/openAiWhisperService.ts

import OpenAI from 'openai';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';

export class OpenAiWhisperService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateSpeech(text: string, voice: string = 'shimmer'): Promise<Buffer> {
    try {
      const response = await this.openai.audio.speech.create({
        model: "tts-1",
        voice: "shimmer",
        input: text,
      });

      // Create a temporary file to store the audio
      const tempFile = path.join(os.tmpdir(), `speech-${Date.now()}.mp3`);

      // Write the audio data to the temporary file
      await fs.writeFile(tempFile, Buffer.from(await response.arrayBuffer()));

      // Read the file back as a Buffer
      const audioBuffer = await fs.readFile(tempFile);

      // Delete the temporary file
      await fs.unlink(tempFile);

      return audioBuffer;
    } catch (error) {
      console.error('Error in generateSpeech:', error);
      throw error;
    }
  }
}