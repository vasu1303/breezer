import { TabId } from "../../types";
import { LiveView } from "./views/LiveView";
import { HowToUseView } from "./views/HowToUseView";
import { WhatIsBreezeView } from "./views/WhatIsBreezeView";
import { BuiltByView } from "./views/BuiltByView";
import hornIcon from "../../assets/hornIcon.png";
import flowImage from "../../assets/flow.png";

interface RightSectionProps {
  activeTab: TabId;
  status: string;
  transcript: string;
  onStart: () => void;
  onStop: () => void;
}

export default function RightSection({
  activeTab,
  status,
  transcript,
  onStart,
  onStop,
}: RightSectionProps) {
  return (
    <section className="flex-1 m-2 rounded-md border text-black border-black h-full flex flex-col border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 border rounded-md border-primary pointer-events-none" />
      
      {/* Horn Icon - Bottom Left (only on How to Use page) */}
      {activeTab === TabId.HowToUse && (
        <img 
          src={hornIcon} 
          alt="Breeze mascot" 
          className="absolute bottom-0 left-9 w-56 h-56 opacity-80 -translate-x-8 translate-y-4 pointer-events-none z-20"
          style={{ width: '324px', height: '324px' }}
        />
      )}
      
      {/* Flow Image - Bottom Right (only on What is Breeze page) */}
      {activeTab === TabId.WhatIsBreeze && (
        <img 
          src={flowImage} 
          alt="Flow illustration" 
          className="absolute bottom-0 -left-10  -z-20 pointer-events-none  max-w-full"
        />
      )}
      
      <div className="flex-1 overflow-y-auto p-8 z-10">
        {activeTab === TabId.Live && (
          <LiveView
            status={status}
            transcript={transcript}
            onStart={onStart}
            onStop={onStop}
          />
        )}

        {activeTab === TabId.HowToUse && (
          <HowToUseView onComplete={() => {}} />
        )}

        {activeTab === TabId.WhatIsBreeze && <WhatIsBreezeView />}

        {activeTab === TabId.BuiltBy && <BuiltByView />}
      </div>
    </section>
  );
}