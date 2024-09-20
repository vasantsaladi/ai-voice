import React from 'react';

interface TranscriptionDisplayProps {
  transcription: string;
}

export default function TranscriptionDisplay({ transcription }: TranscriptionDisplayProps) {
  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg max-w-lg w-full">
      <h2 className="text-xl font-semibold mb-2">Transcription:</h2>
      <p>{transcription || "No transcription yet"}</p>
    </div>
  );
}
