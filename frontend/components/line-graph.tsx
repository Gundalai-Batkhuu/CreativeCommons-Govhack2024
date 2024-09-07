import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CallData {
  date: string;
  calls: number;
}

const generateData = (startDate: Date, days: number): CallData[] => {
  const data: CallData[] = [];
  let currentDate = new Date(startDate);
  let callsCount = Math.floor(Math.random() * 100) + 200; // Start with a random number between 200-300

  for (let i = 0; i < days; i++) {
    data.push({
      date: currentDate.toISOString().split('T')[0],
      calls: callsCount
    });

    // Decrease calls count with some randomness
    callsCount = Math.max(50, callsCount - Math.floor(Math.random() * 50));
    
    // Occasionally increase calls to add some variation
    if (Math.random() < 0.2) {
      callsCount += Math.floor(Math.random() * 20);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

const CallsLineGraph: React.FC = () => {
  const data = generateData(new Date('2023-01-01'), 90); // Generate 90 days of data

  return (
    <Card className="w-[60%] max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-700">Calls Received Per Day</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              interval={13} // Show every 2 weeks
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value: number) => [`${value} calls`, 'Calls']}
              labelFormatter={(label: string) => {
                const date = new Date(label);
                return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="calls" stroke="#111" activeDot={{ r: 8 }} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CallsLineGraph;