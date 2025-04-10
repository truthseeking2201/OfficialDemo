
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface AIAgent {
  id: string;
  name: string;
  avatar: string;
  primaryColor: string;
  activeVaults: number;
  totalValue: string;
  monthChange: string;
  returns: string;
  nextRewards: string;
}

interface AgentSelectorProps {
  agents: AIAgent[];
  selectedAgent: AIAgent;
  onAgentChange: (agentId: string) => void;
}

const AgentSelector: React.FC<AgentSelectorProps> = ({ agents, selectedAgent, onAgentChange }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-transparent border border-white/20 text-white flex gap-2 items-center">
          <div className={`w-8 h-8 rounded-full ${selectedAgent.avatar} flex items-center justify-center`}>
            <span className="text-sm font-medium">{selectedAgent.name.charAt(0)}</span>
          </div>
          <span>{selectedAgent.name}</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-nodo-dark border border-white/10 text-white">
        {agents.map(agent => (
          <DropdownMenuItem 
            key={agent.id} 
            onClick={() => onAgentChange(agent.id)}
            className="hover:bg-white/10 focus:bg-white/10 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full ${agent.avatar} flex items-center justify-center`}>
                <span className="text-xs font-medium">{agent.name.charAt(0)}</span>
              </div>
              <span>{agent.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AgentSelector;
