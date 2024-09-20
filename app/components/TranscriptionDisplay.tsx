import React from 'react';

interface TranscriptionDisplayProps {
  transcription: string;
}

export default function TranscriptionDisplay({ transcription }: TranscriptionDisplayProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-primary">Transcription:</h2>
        <p className="text-lg text-neutral">{transcription || "No transcription yet"}</p>
      </div>
    </div>
  );
}
