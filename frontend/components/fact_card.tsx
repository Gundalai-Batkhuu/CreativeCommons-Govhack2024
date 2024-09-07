import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon} from "lucide-react"
import * as react from 'react';

interface FactCardProps {
    title: string;
    figure: string;
    baseText: string;
    icon: LucideIcon;
  }

const FactCard: React.FC<FactCardProps> = ({title, figure, baseText, icon: Icon}: {title: string, figure: string, baseText: string, icon: LucideIcon}) => {
  return (
    <Card className="w-[18rem] max-w-md mx-auto transition-all duration-300 ease-in-out hover:scale-[1.02]">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-500 flex justify-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <Icon className="h-14 w-14 text-gray-700 mb-4" />
        <div className="text-5xl font-bold text-gray-700">{figure}</div>
        <p className="text-gray-500 mt-2">{baseText}</p>
      </CardContent>
    </Card>
  );
};

export default FactCard;