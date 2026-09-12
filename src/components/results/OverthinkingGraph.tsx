import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { GraphPoint } from '../../types';

interface Props {
  graphData: GraphPoint[];
  finalScore: number;
}

export default function OverthinkingGraph({ graphData, finalScore }: Props) {
  return (
    <div className="brutal-panel p-8 sm:p-10">
      <div className="brutal-header -mt-8 -mx-8 sm:-mt-10 sm:-mx-10 mb-8">
        <span>OVERTHINKING TRAJECTORY</span>
        <span>PEAK: {finalScore}%</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={graphData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="overthinkingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis
              dataKey="time"
              stroke="#ffffff"
              fontSize={11}
              fontFamily="var(--font-mono)"
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              stroke="#ffffff"
              fontSize={11}
              fontFamily="var(--font-mono)"
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as GraphPoint;
                  return (
                    <div className="bg-black border-2 border-white p-3 font-mono text-xs shadow-[3px_3px_0px_#00f0ff]">
                      <p className="text-text-muted">{data.time}</p>
                      <p className="text-accent-cyan font-bold text-sm">
                        Level: {data.level}%
                      </p>
                      {data.label && (
                        <p className="text-accent-yellow text-xs mt-0.5">{data.label}</p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="level"
              stroke="#00f0ff"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#overthinkingGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 p-4 bg-black border-2 border-white text-center text-xs text-text-secondary font-mono font-bold">
        "Peak overthinking reached <span className="text-accent-cyan font-bold text-sm">{finalScore}%</span> approximately 3 minutes before opening this website."
      </div>
    </div>
  );
}
