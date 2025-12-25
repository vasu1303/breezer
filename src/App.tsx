import { useState } from "react";
import { useShortcut } from "./hooks/useShortcut";
import { useTranscription } from "./hooks/useTranscription";
import { TabId, TranscriptionStatus } from "./types";
import LeftSection from "./components/sections/LeftSection";
import RightSection from "./components/sections/RighSection";

function App() {
  const [activeTab, setActiveTab] = useState<TabId>(TabId.HowToUse);

  const { status, transcript, startRecording, stopRecording } = useTranscription();

  const handleToggle = () => {
    // Don't handle shortcuts when in "How to Use" tab (onboarding handles its own)
    if (activeTab === TabId.HowToUse) {
      return;
    }
    // Ctrl+T just toggles recording, doesn't change tabs
    if (status === TranscriptionStatus.IDLE || status === TranscriptionStatus.ERROR) {
      startRecording(true);
    } else {
      stopRecording();
    }
  };

  const handleStop = () => {
    // Don't handle shortcuts when in "How to Use" tab (onboarding handles its own)
    if (activeTab === TabId.HowToUse) {
      return;
    }
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
          // Only start recording, don't change tabs
          startRecording(true);
        }}
        onStop={stopRecording}
      />
    </main>
  );
}

export default App;
