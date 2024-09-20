import React from "react";

interface AIResponseDisplayProps {
  response: string;
}

export default function AIResponseDisplay({
  response,
}: AIResponseDisplayProps) {
  return (
    <div className="card bg-secondary text-primary">
      <div className="card-body">
        <h2 className="card-title">AI Response:</h2>
        <p className="text-lg">{response || "Waiting for AI response..."}</p>
      </div>
    </div>
  );
}
