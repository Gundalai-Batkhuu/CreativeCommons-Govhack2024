import React from 'react';
import { ArrowBigUp, ArrowBigDown, Flame, MessageSquare, Sparkle } from "lucide-react"

type EngagementLevel = 'high' | 'mid' | 'low';

interface Stat {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}

const StatsCard: React.FC = () => {
  const stats: Stat[] = [
    { label: 'Efficiency', value: '89%', icon: Sparkle, color: "green" },
    { label: 'Engagement', value: 'High', icon: Flame, color: "green" },
    { label: 'Discussions', value: 20, icon: MessageSquare , color: "black"},
    { label: 'Upvotes', value: '11k', icon: ArrowBigUp, color: "yellow" },
    { label: 'Downvotes', value: 500, icon: ArrowBigDown, color: "red" },
  ];

  return (
    <div className="bg-white p-6 w-[18rem] mx-auto transition-all duration-300 ease-in-out hover:scale-[1.02] rounded-xl border bg-card text-card-foreground shadow">
      <div className="space-y-4 pt-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <stat.icon className={`h-5 w-5 text-secondaryAccent`} />
              <span className="text-sm font-medium text-gray-500">{stat.label}</span>
            </div>
            <span className={`text-sm font-semibold text-[green]`}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;