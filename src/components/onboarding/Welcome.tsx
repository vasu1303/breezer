import { useState, useEffect } from "react";
import { useTranscription } from "../../hooks/useTranscription";
import { useConfetti } from "../../hooks/useConfetti";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { useShortcut } from "../../hooks/useShortcut";
import { TranscriptionStatus } from "../../types";
import { WelcomeHeader } from "./WelcomeHeader";
import { ConfettiEffect } from "./ConfettiEffect";
import { Step1Permissions } from "./steps/Step1Permissions";
import { Step2Shortcut } from "./steps/Step2Shortcut";
import { Step3TestRun } from "./steps/Step3TestRun";
import { Step4Completion } from "./steps/Step4Completion";

interface WelcomeProps {
  onComplete: () => void;
}

export const Welcome = ({ onComplete }: WelcomeProps) => {
  const [step, setStep] = useState(1);
  const { status, transcript, startRecording, stopRecording } = useTranscription();
  const { showConfetti, confettiKey, triggerConfetti } = useConfetti();
  const windowDimensions = useWindowDimensions();

  // Trigger confetti when step becomes 4
  useEffect(() => {
    if (step === 4) {
      triggerConfetti();
    }
  }, [step, triggerConfetti]);

  const handleStartRecording = () => {
    startRecording(false); // false = don't broadcast/type
  };

  // Handle shortcuts for test run (step 3)
  const handleToggle = () => {
    // Only work in step 3 (test run)
    if (step === 3) {
      if (status === TranscriptionStatus.IDLE || status === TranscriptionStatus.ERROR) {
        handleStartRecording();
      } else {
        stopRecording();
      }
    }
  };

  const handleStop = () => {
    // Only work in step 3 (test run)
    if (step === 3) {
      stopRecording();
    }
  };

  // Set up shortcuts
  useShortcut(handleToggle, handleStop);

  return (
    <>
      <ConfettiEffect
        show={showConfetti && step === 4}
        key={confettiKey}
        width={windowDimensions.width}
        height={windowDimensions.height}
      />

      <div className="flex flex-col items-center text-center max-w-md mx-auto p-6 space-y-6 animate-in fade-in zoom-in duration-500">
        <WelcomeHeader />

        {step === 1 && <Step1Permissions onNext={() => setStep(2)} />}

        {step === 2 && <Step2Shortcut onNext={() => setStep(3)} />}

        {step === 3 && (
          <Step3TestRun
            status={status}
            transcript={transcript}
            onStart={handleStartRecording}
            onStop={stopRecording}
            onNext={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <Step4Completion
            onComplete={onComplete}
            onTriggerConfetti={triggerConfetti}
          />
        )}
      </div>
    </>
  );
};