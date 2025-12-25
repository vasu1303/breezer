import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { TranscriptionStatus } from "../../../types";

interface Step3TestRunProps {
  status: string;
  transcript: string;
  onStart: () => void;
  onStop: () => void;
  onNext: () => void;
}

export const Step3TestRun: React.FC<Step3TestRunProps> = ({
  status,
  transcript,
  onStart,
  onStop,
  onNext,
}) => {
  const isListening = status === TranscriptionStatus.LISTENING;

  return (
    <div className="border border-1 p-6 rounded-xl w-full">
      <Badge status={status} />
      <h3 className="text-zinc-500 font-semibold mt-4 mb-2">Give it a spin</h3>
      <p className="text-zinc-600 text-sm mb-4">
        Try speaking a sentence below. We won't type this one into other apps
        yet.
      </p>
      
      {/* Keyboard Shortcut Instructions */}
      <div className="mb-4 p-3 bg-zinc-50 rounded-lg border border-zinc-200">
        <p className="text-xs text-zinc-600 mb-2 font-medium">
          💡 Tip: You can use keyboard shortcuts too!
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-zinc-500">Start:</span>
          <div className="inline-flex gap-1 items-center">
            <kbd className="bg-zinc-800 text-zinc-200 px-1.5 py-0.5 rounded text-[10px] border border-zinc-700">
              Ctrl
            </kbd>
            <span className="text-zinc-400">+</span>
            <kbd className="bg-zinc-800 text-zinc-200 px-1.5 py-0.5 rounded text-[10px] border border-zinc-700">
              T
            </kbd>
          </div>
          <span className="text-zinc-400">|</span>
          <span className="text-zinc-500">Stop:</span>
          <div className="inline-flex gap-1 items-center">
            <kbd className="bg-zinc-800 text-zinc-200 px-1.5 py-0.5 rounded text-[10px] border border-zinc-700">
              Ctrl
            </kbd>
            <span className="text-zinc-400">+</span>
            <kbd className="bg-zinc-800 text-zinc-200 px-1.5 py-0.5 rounded text-[10px] border border-zinc-700">
              K
            </kbd>
          </div>
        </div>
      </div>

      <div className="min-h-[80px] bg-zinc-100 rounded-lg border border-1 p-3 mb-4 text-left text-zinc-600 text-sm font-mono">
        {transcript || (
          <span className="text-zinc-700 italic">"Hello world..."</span>
        )}
      </div>

      <div className="flex gap-2 justify-center">
        <Button
          className="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-300"
          variant={isListening ? "secondary" : "primary"}
          onClick={isListening ? onStop : onStart}
        >
          {isListening ? "Stop" : "Test Mic"}
        </Button>

        {transcript.length > 5 && (
          <Button onClick={onNext}>Looks Good →</Button>
        )}
      </div>
    </div>
  );
};
