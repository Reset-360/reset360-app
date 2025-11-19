import { Factor, Question } from '@/types/adapts';
import React, { useMemo } from 'react';

import { Card } from '@/components/ui/card';

import {
  getFactorItemCounts,
  getMaxScoresPerFactor,
} from '@/utils/adaptsHelper';
import { FACTOR_META } from '@/constants/adapts/FactorMeta';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

type MentalHealthRadialProfileProps = {
  totalSubScaleScore: Record<Factor, number>;
  questions: Question[];
};

// Shape of each item passed into the RadarChart
type RadarDataPoint = {
  subject: string; // Label to display around the chart (factor label)
  value: number; // Actual score for that factor
  fullMark: number; // Maximum possible score for that factor
};

const MentalHealthRadialProfile: React.FC<MentalHealthRadialProfileProps> = ({
  totalSubScaleScore,
  questions,
}) => {
  /**
   * 📊 Count how many items belong to each factor
   *    e.g. { MDD: 10, GAD: 8, ... }
   */
  const factorCounts = useMemo(
    () => getFactorItemCounts(questions),
    [questions]
  );

  /**
   * 🎯 Compute the maximum possible score for each factor based on:
   *    - how many items belong to that factor
   *    - the scoring scheme behind the scenes
   *    e.g. { MDD: 28, GAD: 21, ... }
   */
  const maxFactorScore = useMemo(
    () => getMaxScoresPerFactor(factorCounts),
    [factorCounts]
  );

  /**
   * 🧮 Determine the maximum score across all factors.
   * This is used as the upper bound for the radial axis so the chart
   * scales based on the actual range of the data instead of a magic number.
   */
  const maxScore = useMemo(() => {
    const values = Object.values(maxFactorScore);

    if (values.length === 0) {
      return 1; // Avoid a [0, 0] domain which would break the axis
    }

    const max = Math.max(...values);
    return max > 0 ? max : 1;
  }, [maxFactorScore]);

  /**
   * 📐 Transform factor scores into a format that the RadarChart understands.
   * Each factor becomes a "spoke" in the radar chart.
   */
  const radarData: RadarDataPoint[] = useMemo(
    () =>
      (Object.keys(totalSubScaleScore) as Factor[]).map((factorKey) => ({
        subject: FACTOR_META[factorKey].label,
        value: totalSubScaleScore[factorKey],
        fullMark: maxFactorScore[factorKey] ?? 0,
      })),
    [totalSubScaleScore, maxFactorScore]
  );

  return (
    <Card className="p-6">
      {/* Header */}
      <h3 className="text-lg font-semibold">Mental Health Profile</h3>

      {/* Radar chart container */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            {/* Grid lines in the radial layout */}
            <PolarGrid stroke="hsl(293 20% 90%)" />

            {/* Factor labels around the circle (MDD, GAD, etc.) */}
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: 'hsl(293 20% 15%)', fontSize: 12 }}
            />

            {/* Radial value axis, scaled based on the max possible score */}
            <PolarRadiusAxis
              angle={90}
              domain={[0, maxScore]}
              tick={{ fill: 'hsl(293 15% 45%)' }}
            />

            {/* The actual filled radar shape representing the client's scores */}
            <Radar
              name="Score"
              dataKey="value"
              stroke="hsl(293 70% 50%)"
              fill="hsl(293 70% 50%)"
              fillOpacity={0.3}
            />

            {/* Tooltip for hovering over each spoke */}
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0 0% 100%)',
                border: '1px solid hsl(293 20% 90%)',
                borderRadius: '0.75rem',
              }}
              labelStyle={{ color: 'hsl(293 20% 15%)' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default MentalHealthRadialProfile;
