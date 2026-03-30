'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import clsx from 'clsx';
import {
  Calendar,
  Eye,
  ChevronRight,
  ActivitySquare,
} from 'lucide-react';

import LoadingSpinner from '@/components/layout/LoadingSpinner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  getAssessmentByUserId,
  getLatestAssessment,
} from '@/services/adaptsService';
import useAuthStore from '@/store/AuthState';
import ResultDetailsDialog from '@/components/client/history/ResultDetailsDialog';
import { formatDate } from '@/utils/formatHelper';
import { ERiskBand, IAssessment, RCADSFactor, TScoreResult } from '@/types/adapts';
import LatestSummaryCard from './LatestSummaryCard';
import { AlertCircle, AlertTriangle, ShieldCheck } from 'lucide-react'
import TrendBadge from './TrendBadge';
import SubScaleSparks from './SubScaleSparks';
import { estimateTscore } from '@/utils/adaptsScoreHelper';

export const HISTORY_RISK_CONFIG: Record<
  string,
  {
    label: string;
    badgeClass: string;
    rowAccent: string;
    icon: React.ReactNode;
    statCard: string;
    textClass: string;
  }
> = {
  high: {
    label: 'Elevated',
    badgeClass: 'bg-rose-100 text-rose-700 border border-rose-200',
    rowAccent: 'border-l-2 border-l-rose-400',
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
    statCard: 'bg-rose-50 border-rose-200',
    textClass: 'text-rose-700',
  },
  moderate: {
    label: 'Borderline Elevated',
    badgeClass: 'bg-amber-100 text-amber-700 border border-amber-200',
    rowAccent: 'border-l-2 border-l-amber-400',
    icon: <AlertCircle className="w-3.5 h-3.5" />,
    statCard: 'bg-amber-50 border-amber-200',
    textClass: 'text-amber-700',
  },
  low: {
    label: 'Within Range',
    badgeClass: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    rowAccent: 'border-l-2 border-l-emerald-400',
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
    statCard: 'bg-emerald-50 border-emerald-200',
    textClass: 'text-emerald-700',
  },
};
 
export function getRiskConfig(riskBand?: string) {
  return HISTORY_RISK_CONFIG[riskBand ?? 'low'] ?? HISTORY_RISK_CONFIG.low;
}

const HistoryPage = () => {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const [isLoading, setIsLoading] = useState(true);
  const [assessments, setAssessments] = useState<IAssessment[]>([]);
  const [latestAssessment, setLatestAssessmentState] = useState<
    IAssessment | undefined
  >();

  const [latestResult, setLatesteResult] = useState<TScoreResult>()
  const [prevResult, setPrevResult] = useState<TScoreResult>()

  const [open, setOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<
    IAssessment | undefined
  >();

  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;
    const fetchAll = async () => {
      try {
        const [all, latest] = await Promise.all([
          getAssessmentByUserId(userId),
          getLatestAssessment(userId),
        ]);

        setAssessments(all || []);

        if (latest) {
          setLatestAssessmentState(latest || undefined);

          const tScore = estimateTscore(latest.answers[0] as any, latest.type);
          setLatesteResult(tScore)
        }

        if (all.length > 1) {
          const prevTscore = estimateTscore(all[1].answers[0] as any, all[1].type);
          setPrevResult(prevTscore)
        }
        
      } catch (error) {
        console.error('Failed to fetch assessments:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, [userId]);

  const latest = useMemo(() => {
    return latestAssessment ?? assessments?.[0];
  }, [latestAssessment, assessments]);

  const handleTakeAssessment = () => router.push('/client/dashboard');

  const handleViewAssessment = (assessment: IAssessment) => {
    if (!assessment) return;
    setSelectedAssessment(assessment);
    setOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="py-10 px-5 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-1">
          Assessment <span className="text-primary">History</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Track your emotional wellbeing over time.
        </p>
      </div>

      {/* Latest summary */}
      {(latest  && latestResult) && <LatestSummaryCard result={latestResult} assessment={latest} />}

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <Card className="p-4 bg-card border">
          <CardContent className="p-0">
            <p className="text-xs text-muted-foreground mb-1">
              Total Assessments
            </p>
            <p className="text-2xl font-bold text-foreground">
              {assessments.length}
            </p>
          </CardContent>
        </Card>

        <Card className="p-4 bg-card border">
          <CardContent className="p-0">
            <p className="text-xs text-muted-foreground mb-1">Current Risk</p>
            <p
              className={clsx(
                'font-semibold text-sm',
                getRiskConfig(latest?.riskBand).textClass
              )}
            >
              {getRiskConfig(latest?.riskBand).label}
            </p>
          </CardContent>
        </Card>

        <Card className="p-4 bg-card border">
          <CardContent className="p-0">
            <p className="text-xs text-muted-foreground mb-1">T-Score Range</p>
            <p className="text-sm font-semibold text-foreground">
              {latestResult?.tScoreCategory?.split('(')[0].trim() ?? '—'}
            </p>
          </CardContent>
        </Card>

        <Card className="p-4 bg-card border">
          <CardContent className="p-0">
            <p className="text-xs text-muted-foreground mb-1">Trend</p>
            <TrendBadge
              current={latestResult?.effectiveTScore}
              previous={prevResult?.effectiveTScore}
            />
          </CardContent>
        </Card>
      </div>

      {/* Assessment history table */}
      <Card className="bg-card overflow-hidden border">
        <div className="p-5 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ActivitySquare className="w-4 h-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">
                All Assessments
              </h2>
            </div>
            <Badge variant="secondary" className="text-xs">
              {assessments.length} total
            </Badge>
          </div>
        </div>

        {assessments.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-muted-foreground text-xs">
                  Date
                </TableHead>
                <TableHead className="text-muted-foreground text-xs">
                  Risk Level
                </TableHead>
                <TableHead className="text-muted-foreground text-xs hidden md:table-cell">
                  Category
                </TableHead>
                <TableHead className="text-muted-foreground text-xs hidden lg:table-cell">
                  Profile
                </TableHead>
                <TableHead className="text-muted-foreground text-xs hidden md:table-cell">
                  Trend
                </TableHead>
                <TableHead className="text-muted-foreground text-xs text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {assessments.map((assessment, index) => {
                const submittedAt = assessment?.submittedAt
                  ? formatDate(assessment.submittedAt)
                  : null;
                const isLatest = assessment._id === latest?._id;
                const config = getRiskConfig(assessment.riskBand);
                const prevAssessment = assessments[index + 1];

                return (
                  <TableRow
                    key={assessment._id}
                    className={clsx(
                      'hover:bg-muted/30 transition-colors',
                      config.rowAccent
                    )}
                  >
                    {/* Date */}
                    <TableCell className="font-medium text-foreground">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm">{submittedAt ?? '—'}</span>
                        {isLatest && (
                          <Badge
                            variant="default"
                            className="text-[10px] px-1.5 py-0 h-4"
                          >
                            Latest
                          </Badge>
                        )}
                      </div>
                    </TableCell>

                    {/* Risk level badge */}
                    <TableCell>
                      <span
                        className={clsx(
                          'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
                          config.badgeClass
                        )}
                      >
                        {config.icon}
                        {config.label}
                      </span>
                    </TableCell>

                    {/* T-score category */}
                    <TableCell className="hidden md:table-cell">
                      <span className="text-xs text-muted-foreground">
                        {assessment.tScoreCategory?.split('(')[0].trim() ?? '—'}
                      </span>
                    </TableCell>

                    {/* Mini subscale spark chart */}
                    <TableCell className="hidden lg:table-cell">
                      <SubScaleSparks subscales={assessment.subScales} />
                    </TableCell>

                    {/* Trend vs previous */}
                    <TableCell className="hidden md:table-cell">
                      <TrendBadge
                        current={assessment.effectiveTScore}
                        previous={prevAssessment?.effectiveTScore}
                      />
                    </TableCell>

                    {/* View action */}
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground gap-1.5 text-xs"
                        onClick={() => handleViewAssessment(assessment)}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">View</span>
                        <ChevronRight className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No assessments yet
            </h3>
            <p className="text-muted-foreground text-sm mb-5">
              Take your first ADAPTS assessment to start tracking your emotional
              wellbeing.
            </p>
            <Button onClick={handleTakeAssessment}>Take Assessment</Button>
          </div>
        )}
      </Card>

      {selectedAssessment && (
        <ResultDetailsDialog
          assessment={selectedAssessment}
          open={open}
          onOpenChange={setOpen}
        />
      )}
    </div>
  );
};

export default HistoryPage;
