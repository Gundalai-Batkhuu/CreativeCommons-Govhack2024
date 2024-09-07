
import TextToSpeech from '@/components/accessibility/text-to-speech';

export default function TextToSpeechPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Text-to-Speech Converter
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your text below and click Generate Speech to hear it spoken aloud using our Shimmer voice.
        </p>
        <TextToSpeech />
      </div>
    </div>
  );
}