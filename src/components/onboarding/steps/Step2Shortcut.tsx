import { Keyboard } from "lucide-react";

interface Step2ShortcutProps {
  onNext: () => void;
}

export const Step2Shortcut: React.FC<Step2ShortcutProps> = ({ onNext }) => {
  return (
    <div className="border border-1 p-6 rounded-xl w-full">
      <div className="text-4xl flex justify-center mb-4">
        <Keyboard />
      </div>
      <h3 className="text-zinc-600 font-semibold mb-2">Global Shortcuts</h3>
      <p className="text-zinc-500 text-sm mb-6">
        You can control Breeze from anywhere on your computer using these shortcuts:
      </p>
      
      {/* Start Recording */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-sm font-medium text-zinc-700">Start Recording</span>
        </div>
        <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 inline-flex gap-2">
          <kbd className="bg-zinc-800 px-2 py-1 rounded text-zinc-300 border border-zinc-700">
            Ctrl
          </kbd>
          <span className="text-zinc-600">+</span>
          <kbd className="bg-zinc-800 px-2 py-1 rounded text-zinc-300 border border-zinc-700">
            T
          </kbd>
        </div>
        <p className="text-xs text-zinc-500 mt-1 ml-1">
          Press to start voice-to-text recording
        </p>
      </div>

      {/* Stop Recording (Kill Switch) */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <span className="text-sm font-medium text-zinc-700">Stop Recording (Kill Switch)</span>
        </div>
        <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 inline-flex gap-2">
          <kbd className="bg-zinc-800 px-2 py-1 rounded text-zinc-300 border border-zinc-700">
            Ctrl
          </kbd>
          <span className="text-zinc-600">+</span>
          <kbd className="bg-zinc-800 px-2 py-1 rounded text-zinc-300 border border-zinc-700">
            K
          </kbd>
        </div>
        <p className="text-xs text-zinc-500 mt-1 ml-1">
          Instantly stop recording from anywhere
        </p>
      </div>
      <div>
        <button
          className="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-300"
          onClick={onNext}
        >
          Got it
        </button>
      </div>
    </div>
  );
};
