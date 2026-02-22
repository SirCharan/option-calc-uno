'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import type { PayoffDataPoint } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

interface PayoffChartProps {
  data: PayoffDataPoint[];
}

export default function PayoffChart({ data }: PayoffChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center text-[#00ff00]/30 text-sm border border-[#00ff00]/20 rounded-lg bg-[#111111]">
        Add option legs to see the payoff diagram
      </div>
    );
  }

  return (
    <div className="bg-[#111111] border border-[#00ff00]/20 rounded-lg p-4">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#00ff0010" />
          <XAxis
            dataKey="underlyingPrice"
            stroke="#00ff00"
            tick={{ fill: '#00cc00', fontSize: 10 }}
            tickFormatter={(v) => formatNumber(v, 0)}
            label={{ value: 'Underlying Price', position: 'insideBottom', offset: -5, fill: '#00ff0060', fontSize: 10 }}
          />
          <YAxis
            stroke="#00ff00"
            tick={{ fill: '#00cc00', fontSize: 10 }}
            tickFormatter={(v) => formatNumber(v, 0)}
            label={{ value: 'P/L', angle: -90, position: 'insideLeft', fill: '#00ff0060', fontSize: 10 }}
          />
          <ReferenceLine y={0} stroke="#00ff0060" strokeDasharray="5 5" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111',
              border: '1px solid #00ff0040',
              color: '#00ff00',
              fontFamily: 'monospace',
              fontSize: '12px',
            }}
            formatter={(value) => [`$${formatNumber(Number(value ?? 0))}`, 'P/L']}
            labelFormatter={(label) => `Price: $${formatNumber(Number(label))}`}
          />
          <Line
            type="monotone"
            dataKey="totalPayoff"
            stroke="#00ff00"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
