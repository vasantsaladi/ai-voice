"use client";

import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-primary to-accent">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full space-y-8">
          <h1 className="text-5xl font-bold text-center text-secondary">
            AI Voice Command
          </h1>
          <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
          <TranscriptionDisplay transcription={transcription} />
          <AIResponseDisplay response={aiResponse} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
