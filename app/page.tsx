"use client";

import { useState } from "react";
import VoiceRecorder from "./components/VoiceRecorder";
import TranscriptionDisplay from "./components/TranscriptionDisplay";
import AIResponseDisplay from "./components/AIResponseDisplay";

export default function Home() {
  const [transcription, setTranscription] = useState("");
  const [aiResponse, setAIResponse] = useState("");

  const handleRecordingComplete = async (audioBlob: Blob) => {
    try {
      // Convert the audio blob to a file
      const file = new File([audioBlob], "audio.wav", { type: "audio/wav" });
      const formData = new FormData();
      formData.append("file", file);

      const transcriptionResponse = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
      const transcriptionData = await transcriptionResponse.json();
      setTranscription(transcriptionData.transcription);

      const aiResponseResponse = await fetch("/api/generate-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcription: transcriptionData.transcription,
        }),
      });
      const aiResponseData = await aiResponseResponse.json();
      setAIResponse(aiResponseData.response);
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">AI Voice Command</h1>
      <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
      <TranscriptionDisplay transcription={transcription} />
      <AIResponseDisplay response={aiResponse} />
    </main>
  );
}
