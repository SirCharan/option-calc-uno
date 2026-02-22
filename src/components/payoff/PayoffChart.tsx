'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
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
      <div className="text-terminal-dimgreen/40 text-xs text-center py-16">
        &gt; Add option legs to generate payoff diagram
      </div>
    );
  }

  const step = Math.max(1, Math.floor(result.points.length / 100));
  const data = result.points
    .filter((_, i) => i % step === 0 || i === result.points.length - 1)
    .map((p) => ({
      spot: Math.round(p.spotPrice * 100) / 100,
      pnl: Math.round(p.totalPayoff * 100) / 100,
    }));

  // Find the zero crossing offset for the gradient
  const minPnl = Math.min(...data.map((d) => d.pnl));
  const maxPnl = Math.max(...data.map((d) => d.pnl));
  const range = maxPnl - minPnl;
  const zeroOffset = range > 0 ? maxPnl / range : 0.5;

  return (
    <ResponsiveContainer width="100%" height={380}>
      <AreaChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 20 }}>
        <defs>
          <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00FF00" stopOpacity={0.3} />
            <stop
              offset={`${Math.max(0, Math.min(100, zeroOffset * 100))}%`}
              stopColor="#00FF00"
              stopOpacity={0.05}
            />
            <stop
              offset={`${Math.max(0, Math.min(100, zeroOffset * 100))}%`}
              stopColor="#FF4444"
              stopOpacity={0.05}
            />
            <stop offset="100%" stopColor="#FF4444" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#003300" strokeOpacity={0.5} />
        <XAxis
          dataKey="spot"
          stroke="#003300"
          tick={{ fill: '#00AA00', fontSize: 10 }}
          tickFormatter={(v: number) =>
            v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v.toFixed(0)
          }
          label={{
            value: 'Spot Price',
            position: 'insideBottom',
            offset: -10,
            fill: '#00AA00',
            fontSize: 10,
          }}
        />
        <YAxis
          stroke="#003300"
          tick={{ fill: '#00AA00', fontSize: 10 }}
          tickFormatter={(v: number) =>
            v >= 1000 || v <= -1000
              ? `${(v / 1000).toFixed(1)}k`
              : v.toFixed(0)
          }
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
            border: '1px solid rgba(0,255,0,0.3)',
            fontFamily: 'monospace',
            fontSize: 11,
            padding: '8px 12px',
          }}
          labelStyle={{ color: '#00AA00', fontSize: 10, marginBottom: 4 }}
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
        <ReferenceLine
          y={0}
          stroke="#00FF00"
          strokeDasharray="5 5"
          strokeOpacity={0.3}
        />
        {result.breakevens.map((b, i) => (
          <ReferenceLine
            key={i}
            x={Math.round(b * 100) / 100}
            stroke="#FFBF00"
            strokeDasharray="3 3"
            strokeOpacity={0.4}
            label={{
              value: `BE`,
              fill: '#FFBF00',
              fontSize: 9,
              position: 'top',
            }}
          />
        ))}
        <Area
          type="monotone"
          dataKey="pnl"
          stroke="#00FF00"
          strokeWidth={2}
          fill="url(#pnlGradient)"
          dot={false}
          activeDot={{ r: 4, fill: '#00FF00', stroke: '#000', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
