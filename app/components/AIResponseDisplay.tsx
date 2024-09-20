import React from 'react';

interface AIResponseDisplayProps {
  response: string;
}

export default function AIResponseDisplay({ response }: AIResponseDisplayProps) {
  return (
    <div className="mt-8 p-4 bg-blue-100 rounded-lg max-w-lg w-full">
      <h2 className="text-xl font-semibold mb-2">AI Response:</h2>
      <p>{response || "Waiting for AI response..."}</p>
    </div>
  );
}
