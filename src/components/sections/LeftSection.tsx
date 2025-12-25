import { Flame, MousePointerClick, Snowflake, Mic } from "lucide-react";
import { TabId } from "../../types";
import Logo from "../ui/Logo";

interface LeftSectionProps {
    activeTab: TabId;
    onTabChange: (tab: TabId) => void;
}
export default function LeftSection({activeTab, onTabChange} : LeftSectionProps) {

    const menuItems = [
        { id: TabId.Live, label: "Live", icon: <Mic />},
        { id: TabId.HowToUse, label: "How to Use", icon: <MousePointerClick />},
        { id: TabId.WhatIsBreeze, label: "What is Breeze?", icon: <Snowflake /> },
        { id: TabId.BuiltBy, label: "Built By", icon: <Flame />}
    ]
    return (
        <section className="m-2  text-black border border-1 rounded-lg p-1">
            <div>
                <Logo />
            </div>
            <nav className="space-y-2 mt-3  border border-1 rounded-md p-2">
                {menuItems.map((item) => (
                    <button key={item.id} onClick={ () => onTabChange(item.id as TabId)} 
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === item.id ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-900/10" : "text-zinc-400 hover:bg-blue-700 hover:text-zinc-100 border border-transparent" }`}
                    >

                        <span className="text-lg opacity-80">{item.icon}</span>
                        
                        {item.label}

                    </button>
                ))}

            </nav>
        </section>
    )
}