import { useEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { listen } from "@tauri-apps/api/event";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Idle");
  const [transcript, setTranscript] =  useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const socketRef = useRef<any>(null);

  const startRecording = async() => {
    setStatus("Connecting to Deepgram...");

    const deepgram = createClient(import.meta.env.VITE_DEEPGRAM_API_KEY);
    const connection = deepgram.listen.live({
      model: "nova-2",
      smart_format: true,
      language: "en-US",
    });

    socketRef.current = connection;

    //SETUP MIC

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true});
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    //HANDLE EVENTS
    connection.on(LiveTranscriptionEvents.Open, () => {
      setStatus("Listening...");

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && connection.getReadyState() === 1) {
          connection.send(event.data);
        }
      };
      mediaRecorder.start(250); // Sending audio chunks every 250ms
    })
    connection.on(LiveTranscriptionEvents.Transcript, (data) => {
      const receivedText = data.channel.alternatives[1].transcript;
      if (receivedText) {
        setTranscript((prev) => prev + " " + receivedText);
        console.log("Deepgram says:", receivedText);
      }
    });

    connection.on(LiveTranscriptionEvents.Error, (err) => console.error(err));
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    socketRef.current?.finish();
    setStatus("Idle");
  }


  useEffect(() => {
    const unlisten =  listen("shortcut-pressed", () => {
      // TOGGLE LOGIC

      if (status === "Idle") {
        startRecording();
      } else {
        stopRecording();
      }
    });

    return () => {
      unlisten.then((f) => f());
    }
  }, [status, startRecording, stopRecording]);
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }



  return (
    <main className="container">
      <h1>Welcome to Breeze</h1>
      <h2>Your seamless voice to text transcriber!</h2>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
      <p>{status}</p>
      <p>{transcript || "Transcribed text will appear here..."}</p>
    </main>
  );
}

export default App;
