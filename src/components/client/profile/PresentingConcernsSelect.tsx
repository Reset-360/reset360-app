'use client';

import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRESENTING_CONCERNS_OPTIONS } from '@/constants/adapts/Specialties';

interface PresentingConcernsSelectProps {
  value: string[];
  onChange: (concerns: string[]) => void;
}

 const PresentingConcernsSelect = ({
  value,
  onChange,
}: PresentingConcernsSelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = PRESENTING_CONCERNS_OPTIONS.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (concern: string) => {
    if (value.includes(concern)) {
      onChange(value.filter((c) => c !== concern));
    } else {
      onChange([...value, concern]);
    }
  };

  const remove = (concern: string) => {
    onChange(value.filter((c) => c !== concern));
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="space-y-2" ref={containerRef}>
      <Label>Presenting Concerns</Label>

      {/* Trigger */}
      <div
        className={cn(
          'relative flex min-h-10 w-full cursor-pointer flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
          'hover:border-ring focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          open && 'ring-2 ring-ring ring-offset-2'
        )}
        onClick={() => setOpen((o) => !o)}
      >
        {value.length === 0 && (
          <span className="text-muted-foreground select-none">
            Select presenting concerns...
          </span>
        )}
        {value.map((concern) => (
          <Badge key={concern} variant="secondary" className="gap-1 pr-1">
            {concern}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                remove(concern);
              }}
              className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
        <ChevronDown
          className={cn(
            'ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform',
            open && 'rotate-180'
          )}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="relative z-50">
          <div className="absolute top-0 left-0 right-0 rounded-md border border-input bg-popover shadow-md">
            {/* Search */}
            <div className="p-2 border-b border-border">
              <Input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search concerns..."
                className="h-8"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Options */}
            <div className="max-h-56 overflow-y-auto p-1">
              {filtered.length === 0 && (
                <p className="py-2 px-3 text-sm text-muted-foreground">
                  No results found.
                </p>
              )}
              {filtered.map((concern) => {
                const selected = value.includes(concern);
                return (
                  <button
                    key={concern}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(concern);
                    }}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-left',
                      'hover:bg-accent hover:text-accent-foreground',
                      selected && 'font-medium'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-4 w-4 shrink-0 items-center justify-center rounded border border-primary',
                        selected
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background'
                      )}
                    >
                      {selected && <Check className="h-3 w-3" />}
                    </div>
                    {concern}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            {value.length > 0 && (
              <div className="border-t border-border p-2 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {value.length} selected
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange([]);
                  }}
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PresentingConcernsSelect;