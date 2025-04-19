
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';

// Sample data structure for crop distribution
const cropData = {
  'Punjab': [
    { name: 'Wheat', value: 45 },
    { name: 'Rice', value: 30 },
    { name: 'Cotton', value: 15 },
    { name: 'Others', value: 10 }
  ],
  'Karnataka': [
    { name: 'Millet', value: 35 },
    { name: 'Sugarcane', value: 25 },
    { name: 'Cotton', value: 25 },
    { name: 'Others', value: 15 }
  ],
  'Gujarat': [
    { name: 'Groundnut', value: 40 },
    { name: 'Cotton', value: 30 },
    { name: 'Cumin', value: 20 },
    { name: 'Others', value: 10 }
  ],
  'Maharashtra': [
    { name: 'Soybean', value: 35 },
    { name: 'Sugarcane', value: 30 },
    { name: 'Cotton', value: 25 },
    { name: 'Others', value: 10 }
  ]
};

const COLORS = ['#4CAF50', '#FFA726', '#42A5F5', '#EC407A'];

const chartConfig = {
  crops: {
    label: 'Crop Distribution',
    theme: {
      light: '#4CAF50',
      dark: '#2E7D32'
    }
  }
};

interface CropAnalysisChartProps {
  selectedState: string;
}

export const CropAnalysisChart = ({ selectedState }: CropAnalysisChartProps) => {
  const data = cropData[selectedState as keyof typeof cropData] || cropData['Punjab'];

  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={chartConfig}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip />
          <Legend />
        </PieChart>
      </ChartContainer>
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className="flex items-center">
              <span
                className="h-3 w-3 rounded-full mr-2"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              {item.name}
            </span>
            <span>{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

