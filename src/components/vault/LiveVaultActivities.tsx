import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, RefreshCw, Cpu } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { Card } from "../../components/ui/card";
import { TransactionDetailDrawer } from "../dashboard/TransactionDetailDrawer";
import useFakeStore, { ActRow } from "../../stubs/fakeStore";
import { InitFakeFeed } from "./InitFakeFeed"; // Import the component that sets up the feed

// Format timestamp to "X time ago" format
const getTimeAgo = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
};

// Format currency values
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
};

// Activity item component
const ActivityItem = ({ activity }: { activity: ActRow }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="bg-white/[0.03] border border-white/5 rounded-xl p-3 hover:bg-white/[0.05] transition-colors cursor-pointer"
  >
    <div className="flex items-start justify-between">
      <div className="flex items-start space-x-3">
        <div className="mt-0.5">
          {activity.type === "Add" && (
            <div className="h-8 w-8 rounded-full bg-emerald/10 flex items-center justify-center">
              <ArrowUpRight size={16} className="text-emerald" />
            </div>
          )}
          {activity.type === "Remove" && (
            <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center">
              <ArrowDownRight size={16} className="text-red-500" />
            </div>
          )}
          {activity.type === "Swap" && (
            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <RefreshCw size={16} className="text-blue-500" />
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center text-sm font-medium text-white space-x-1">
            <span>{activity.type}</span>
            <span className="text-white">{activity.token}</span>
          </div>
          <div className="text-xs text-white/60 mt-1">
            <div className="flex items-center">
              <span className="font-mono font-medium text-white/80">
                {formatCurrency(activity.value)}
              </span>
              <span className="mx-1.5">•</span>
              <span className="font-mono">{activity.vault}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-[10px] text-white/40 font-mono mt-1">
        {getTimeAgo(activity.timestamp)} ago
      </div>
    </div>
  </motion.div>
);

export function LiveVaultActivities() {
  // Get activities from Zustand store (will auto-update on changes)
  const activities = useFakeStore(state => state.act);
  
  const [currentTab, setCurrentTab] = useState<string>('all');
  const [selectedActivity, setSelectedActivity] = useState<ActRow | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);

  // Filter activities by type
  const filteredActivities = useMemo(() => {
    if (currentTab === 'all') return activities;
    return activities.filter(a => a.type === currentTab);
  }, [activities, currentTab]);

  return (
    <Card className="glass-card-premium rounded-[24px] overflow-hidden">
      {/* Mount the InitFakeFeed component to keep the feed going */}
      <InitFakeFeed />
      
      <div className="px-8 pt-8 pb-6 relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-radial from-brand-500/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-violet/20 to-transparent"></div>
        </div>
        <div className="space-y-2 relative">
          <h3 className="text-lg font-medium text-white/95">
            <span className="brand-text-glow">Live Activity</span>
          </h3>
          <p className="text-sm text-white/60 font-light">Real-time vault updates from AI and users</p>
        </div>
      </div>
      
      <div className="p-8 pt-0 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <Tabs
            defaultValue="all"
            value={currentTab}
            onValueChange={setCurrentTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-6 bg-white/5 rounded-lg p-1">
              <TabsTrigger
                value="all"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500/20 data-[state=active]:to-orange-500/20 data-[state=active]:text-orange-500 data-[state=active]:text-black"
              >
                <Cpu size={14} />
                <span>All</span>
                <Badge variant="outline" className="ml-1 h-5 px-1.5 text-[10px]">
                  {activities.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="Add"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500/20 data-[state=active]:to-orange-500/20 data-[state=active]:text-orange-500 data-[state=active]:text-black"
              >
                <ArrowUpRight size={14} />
                <span>Add Liquidity</span>
              </TabsTrigger>
              <TabsTrigger
                value="Remove"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500/20 data-[state=active]:to-orange-500/20 data-[state=active]:text-orange-500 data-[state=active]:text-black"
              >
                <ArrowDownRight size={14} />
                <span>Remove Liquidity</span>
              </TabsTrigger>
              <TabsTrigger
                value="Swap"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500/20 data-[state=active]:to-orange-500/20 data-[state=active]:text-orange-500 data-[state=active]:text-black"
              >
                <RefreshCw size={14} />
                <span>Swap</span>
              </TabsTrigger>
            </TabsList>

            <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              <AnimatePresence initial={false}>
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      activity={activity}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-white/40">
                    No activities found
                  </div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </div>
    </Card>
  );
}