'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { PayoffResult } from '@/lib/types';

interface PayoffChartProps {
  result: PayoffResult | null;
}

export function PayoffChart({ result }: PayoffChartProps) {
  if (!result || result.points.length === 0) {
    return (
      <div className="text-terminal-dimgreen text-xs text-center py-12">
        &gt; Add option legs to generate payoff diagram
      </div>
    );
  }

  // Sample every Nth point for performance (show ~100 points)
  const step = Math.max(1, Math.floor(result.points.length / 100));
  const data = result.points
    .filter((_, i) => i % step === 0 || i === result.points.length - 1)
    .map((p) => ({
      spot: Math.round(p.spotPrice * 100) / 100,
      pnl: Math.round(p.totalPayoff * 100) / 100,
    }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#003300" />
        <XAxis
          dataKey="spot"
          stroke="#00AA00"
          tick={{ fill: '#00AA00', fontSize: 10 }}
          tickFormatter={(v: number) => v.toLocaleString()}
          label={{
            value: 'Spot Price',
            position: 'insideBottom',
            offset: -5,
            fill: '#00AA00',
            fontSize: 10,
          }}
        />
        <YAxis
          stroke="#00AA00"
          tick={{ fill: '#00AA00', fontSize: 10 }}
          tickFormatter={(v: number) => v.toLocaleString()}
          label={{
            value: 'P/L',
            angle: -90,
            position: 'insideLeft',
            fill: '#00AA00',
            fontSize: 10,
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#000',
            border: '1px solid #00FF00',
            fontFamily: 'monospace',
            fontSize: 11,
          }}
          labelStyle={{ color: '#00FF00' }}
          itemStyle={{ color: '#00FF00' }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(value: any) => [
            `$${Number(value ?? 0).toLocaleString()}`,
            'P/L',
          ]}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          labelFormatter={(label: any) =>
            `Spot: $${Number(label).toLocaleString()}`
          }
        />
        <ReferenceLine y={0} stroke="#00FF00" strokeDasharray="5 5" strokeOpacity={0.5} />
        {result.breakevens.map((b, i) => (
          <ReferenceLine
            key={i}
            x={Math.round(b * 100) / 100}
            stroke="#FFBF00"
            strokeDasharray="3 3"
            strokeOpacity={0.5}
          />
        ))}
        <Line
          type="monotone"
          dataKey="pnl"
          stroke="#00FF00"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: '#00FF00', stroke: '#000' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
