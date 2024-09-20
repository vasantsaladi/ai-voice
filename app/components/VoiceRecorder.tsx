"use client";

import React, { useState, useRef } from "react";

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onRecordingComplete,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Float32Array[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      const processor = audioContextRef.current.createScriptProcessor(
        1024,
        1,
        1
      );

      source.connect(processor);
      processor.connect(audioContextRef.current.destination);

      chunksRef.current = [];

      processor.onaudioprocess = (e) => {
        const input = e.inputBuffer.getChannelData(0);
        chunksRef.current.push(new Float32Array(input));
      };

      setIsRecording(true);

      mediaRecorderRef.current = {
        stop: () => {
          stream.getTracks().forEach((track) => track.stop());
          processor.disconnect();
          source.disconnect();

          // Concatenate all chunks into a single Float32Array
          const totalLength = chunksRef.current.reduce(
            (acc, chunk) => acc + chunk.length,
            0
          );
          const audioData = new Float32Array(totalLength);
          let offset = 0;
          for (const chunk of chunksRef.current) {
            audioData.set(chunk, offset);
            offset += chunk.length;
          }

          const wavBlob = createWavBlob(
            audioData,
            audioContextRef.current!.sampleRate
          );
          onRecordingComplete(wavBlob);
        },
      } as MediaRecorder;
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const createWavBlob = (audioData: Float32Array, sampleRate: number): Blob => {
    const buffer = new ArrayBuffer(44 + audioData.length * 2);
    const view = new DataView(buffer);

    // Write WAV header
    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + audioData.length * 2, true);
    writeString(view, 8, "WAVE");
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, "data");
    view.setUint32(40, audioData.length * 2, true);

    // Write audio data
    const length = audioData.length;
    const volume = 1;
    let index = 44;
    for (let i = 0; i < length; i++) {
      view.setInt16(index, audioData[i] * (0x7fff * volume), true);
      index += 2;
    }

    return new Blob([buffer], { type: "audio/wav" });
  };

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  return (
    <button onClick={isRecording ? stopRecording : startRecording}>
      {isRecording ? "Stop Recording" : "Start Recording"}
    </button>
  );
};

export default VoiceRecorder;
