'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import clsx from 'clsx';
import { Calendar, Eye } from 'lucide-react';

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
import { ERiskLevel, IAssessment } from '@/types/adapts';
import {
  getRiskLevelColor,
  getRiskTextColor,
} from '@/utils/adaptsResultHelper';
import ResultDetailsDialog from '@/components/client/history/ResultDetailsDialog';
import { formatDate } from '@/utils/formatHelper';

const HistoryPage = () => {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const [isLoading, setIsLoading] = useState(true);
  const [assessments, setAssessments] = useState<IAssessment[]>([]);
  const [latestAssessment, setLatestAssessmentState] = useState<
    IAssessment | undefined
  >();
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
        setLatestAssessmentState(latest || undefined);
      } catch (error) {
        console.error('Failed to fetch assessments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, [userId]);

  const latest = useMemo(() => {
    if (latestAssessment) return latestAssessment;
    return assessments?.[0];
  }, [latestAssessment, assessments]);

  const stats = useMemo(() => {
    const risk = latest?.riskLevel || ERiskLevel.low;
    const submittedAt = latest?.submittedAt ? moment(latest.submittedAt) : null;

    return {
      tScore: latest?.tScore ?? '-',
      riskLevel: latest?.riskLevel ?? '-',
      riskClass: getRiskTextColor(risk),
      dateText: submittedAt ? submittedAt.format('MMMM DD, yyyy') : '-',
      timeText: submittedAt ? submittedAt.format('hh:mm A') : '-',
    };
  }, [latest]);

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
    <div className="py-10 px-5">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Assessment <span className="text-primary">History</span>
        </h1>
        <p className="text-muted-foreground">
          Track your ADAPTS assessment progress over time.
        </p>
      </div>

      {/* 📊 Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-5 bg-card">
          <CardContent className="px-0">
            <span className="text-sm text-muted-foreground mb-1">
              Latest t-Score
            </span>
            <div className="text-xl font-bold text-foreground">
              {stats.tScore}
            </div>
          </CardContent>
        </Card>

        <Card className="p-5 bg-card">
          <CardContent className="px-0">
            <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
            <p className={clsx('font-bold', stats.riskClass)}>
              {stats.riskLevel}
            </p>
          </CardContent>
        </Card>

        <Card className="p-5 bg-card">
          <CardContent className="px-0">
            <p className="text-sm text-muted-foreground mb-1">Last Attempt</p>
            <p className="font-bold text-foreground">
              {stats.dateText} at {stats.timeText}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 🗂️ Assessment History Table */}
      <Card className="bg-card overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
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
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">t-Score</TableHead>
                <TableHead className="text-muted-foreground">
                  Risk Level
                </TableHead>
                <TableHead className="text-muted-foreground text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {assessments.map((assessment) => {
                const submittedAt = assessment?.submittedAt
                  ? formatDate(assessment.submittedAt)
                  : null;

                const isLatest = assessment._id === latest._id;

                return (
                  <TableRow
                    key={assessment._id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {submittedAt
                          ? submittedAt
                          : '-'}
                        {isLatest && (
                          <Badge
                            variant="default"
                            className="text-[10px] px-1.5 py-0"
                          >
                            Latest
                          </Badge>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <span
                        className={clsx(
                          'inline-flex items-center justify-center w-10 h-10 rounded-lg font-semibold',
                          getRiskTextColor(
                            assessment.riskLevel || ERiskLevel.low
                          )
                        )}
                      >
                        {assessment.tScore ?? '-'}
                      </span>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={clsx(
                          'text-xs text-white',
                          getRiskLevelColor(
                            assessment.riskLevel || ERiskLevel.low
                          )
                        )}
                      >
                        {assessment.riskLevel}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-foreground"
                          onClick={() => handleViewAssessment(assessment)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
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
            <p className="text-muted-foreground mb-4">
              Take your first ADAPTS assessment to start tracking your progress.
            </p>
            <Button onClick={handleTakeAssessment}>Take Assessment</Button>
          </div>
        )}
      </Card>

      {selectedAssessment ? (
        <ResultDetailsDialog
          assessment={selectedAssessment}
          open={open}
          onOpenChange={setOpen}
        />
      ) : null}
    </div>
  );
};

export default HistoryPage;
