import type { TimeSeriesData } from '@/stores/admin/analyticsStore'

interface AnalyticsChartProps {
  title: string
  data: TimeSeriesData[]
  color?: string
  height?: number
}

export function AnalyticsChart({ title, data, color = 'blue', height = 200 }: AnalyticsChartProps) {
  if (!data.length) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex justify-center items-center h-32 text-gray-500">
          No data available
        </div>
      </div>
    )
  }

  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
      <div className="relative" style={{ height }}>
        <svg className="w-full h-full" viewBox={`0 0 ${data.length * 60} ${height}`}>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((percent) => (
            <line
              key={percent}
              x1="0"
              y1={height - (height * percent / 100)}
              x2={data.length * 60}
              y2={height - (height * percent / 100)}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Data line */}
          <polyline
            fill="none"
            stroke={color === 'blue' ? '#3b82f6' : color === 'green' ? '#10b981' : color === 'purple' ? '#8b5cf6' : '#f97316'}
            strokeWidth="2"
            points={data.map((d, i) => {
              const x = i * 60 + 30
              const y = height - ((d.value - minValue) / range) * (height * 0.8) - height * 0.1
              return `${x},${y}`
            }).join(' ')}
          />
          
          {/* Data points */}
          {data.map((d, i) => {
            const x = i * 60 + 30
            const y = height - ((d.value - minValue) / range) * (height * 0.8) - height * 0.1
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill={color === 'blue' ? '#3b82f6' : color === 'green' ? '#10b981' : color === 'purple' ? '#8b5cf6' : '#f97316'}
              />
            )
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          {data.map((d, i) => (
            <span key={i} className="text-center" style={{ width: '60px' }}>
              {d.date}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
} 