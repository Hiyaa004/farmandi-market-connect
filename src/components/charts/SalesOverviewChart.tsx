
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';

const data = [
  { month: 'Jan', sales: 4500 },
  { month: 'Feb', sales: 5200 },
  { month: 'Mar', sales: 4800 },
  { month: 'Apr', sales: 6300 },
  { month: 'May', sales: 5900 },
  { month: 'Jun', sales: 7500 },
  { month: 'Jul', sales: 6800 }
];

const chartConfig = {
  sales: {
    label: 'Sales',
    theme: {
      light: '#4CAF50',
      dark: '#2E7D32'
    }
  }
};

export const SalesOverviewChart = () => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Sales Overview</h3>
        <select className="text-sm border rounded p-1">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>
      <div className="h-[300px] w-full">
        <ChartContainer config={chartConfig}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip />
            <Bar
              dataKey="sales"
              fill="var(--color-sales)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </Card>
  );
};

