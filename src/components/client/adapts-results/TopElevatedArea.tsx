import { ITopElevatedAreasResult } from '@/types/adapts';

interface Props {
  data: ITopElevatedAreasResult;
}

const TopElevatedArea = ({ data }: Props) => {
  if (!data?.primary) return null;

  const getColor = (band: string) => {
    if (band === 'high') return 'bg-red-50 text-red-600 border-red-200';
    if (band === 'moderate') return 'bg-yellow-50 text-yellow-600 border-yellow-200';
    return 'bg-green-50 text-green-600 border-green-200';
  };

  return (
    <div className="bg-gray-500/5 rounded-2xl p-5 border border-gray-500/20 mb-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900">
          Top Elevated Areas
        </h2>
        <p className="text-xs text-gray-500">
          These areas showed the highest levels based on your responses.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4">
        {[data.primary, data.secondary]
          .filter(Boolean)
          .map((item, index) => (
            <div
              key={item?.factor}
              className="rounded-lg border border-red-400/50 p-4 bg-red-400/10"
            >
              {/* Title + Badge */}
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800">
                  {item?.label}
                </p>

                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full border ${getColor(
                    item?.riskBand as string
                  )}`}
                >
                  {item?.percentage}%
                </span>
              </div>

              {/* Summary */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {item?.summary}
              </p>
            </div>
          ))}
      </div>

      {/* Optional Headline */}
      <div className="mt-4">
        <p className="text-xs  italic">{data.headline}</p>
      </div>
    </div>
  );
};

export default TopElevatedArea;