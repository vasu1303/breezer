import { useState } from "react";
import { useShortcut } from "./hooks/useShortcut";
import { useTranscription } from "./hooks/useTranscription";
import { TabId, TranscriptionStatus } from "./types";
import LeftSection from "./components/sections/LeftSection";
import RightSection from "./components/sections/RighSection";

function App() {
  const [activeTab, setActiveTab] = useState<TabId>(TabId.Live);

  const { status, transcript, startRecording, stopRecording } = useTranscription();

  const handleToggle = () => {
    if (status === TranscriptionStatus.IDLE || status === TranscriptionStatus.ERROR) {
      setActiveTab(TabId.Live);
      startRecording(true);
    } else {
      stopRecording();
    }
  };

  const handleStop = () => {
    console.log("Kill switch: Stopping recording");
    stopRecording();
  };

  useShortcut(handleToggle, handleStop);

  return (
    <main className="flex h-screen w-screen  text-zinc-100 font-sans selection:bg-teal-500/30 overflow-hidden">
      <LeftSection activeTab={activeTab} onTabChange={setActiveTab} />

      <RightSection
        activeTab={activeTab}
        status={status}
        transcript={transcript}
        onStart={() => {
          setActiveTab(TabId.Live);
          startRecording(true);
        }}
        onStop={stopRecording}
      />
    </main>
  );
}

export default App;
