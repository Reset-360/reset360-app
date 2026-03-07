import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const sessionTypes = ['Online', 'In-Person'];
const specializations = [
  'Student support',
  'Parenting support',
  'Stress & burnout',
  'Recovery coaching',
];
const availabilities = ['Available today', 'Available this week'];

const FindCoachHero = () => {
  const [activeSession, setActiveSession] = useState<string[]>([]);
  const [activeSpec, setActiveSpec] = useState<string[]>([]);
  const [activeAvail, setActiveAvail] = useState<string | null>(null);

  const toggleArr = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  return (
    <section className="relative pt-28 pb-20">
      <div className="absolute inset-0 bg-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(258_90%_66%/0.3),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/50 to-transparent" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container relative max-w-4xl z-10 mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8"
        >
          <MapPin className="w-10 h-10 text-primary" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 font-display">
            Find a Mental Wellness Coach{' '}
            <span className="text-primary">Near You</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with certified coaches through Reset 360. Choose online
            sessions or meet in accredited partner locations.
          </p>
        </motion.div>

        {/* Search card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-2xl border border-border/60 shadow-elevated p-6 md:p-8"
        >
          {/* Search bar */}
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Enter ZIP Code / City / Region"
                className="pl-10 h-12 rounded-xl border-border bg-background text-base"
              />
            </div>
            <Button className="bg-gradient-cta text-primary-foreground rounded-xl h-12 px-6 hover:opacity-90 transition-opacity gap-2">
              <Search className="w-4 h-4" />
              Find Coaches
            </Button>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            {/* Session Type */}
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                Session Type
              </p>
              <div className="flex flex-wrap gap-2">
                {sessionTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() =>
                      setActiveSession(toggleArr(activeSession, t))
                    }
                    className={`text-sm px-4 py-2 rounded-full border transition-all ${
                      activeSession.includes(t)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-muted-foreground border-border hover:border-primary/40'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Specialization */}
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                Specialization
              </p>
              <div className="flex flex-wrap gap-2">
                {specializations.map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveSpec(toggleArr(activeSpec, s))}
                    className={`text-sm px-4 py-2 rounded-full border transition-all ${
                      activeSpec.includes(s)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-muted-foreground border-border hover:border-primary/40'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                Availability
              </p>
              <div className="flex flex-wrap gap-2">
                {availabilities.map((a) => (
                  <button
                    key={a}
                    onClick={() => setActiveAvail(activeAvail === a ? null : a)}
                    className={`text-sm px-4 py-2 rounded-full border transition-all ${
                      activeAvail === a
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-muted-foreground border-border hover:border-primary/40'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-foreground mt-5"
        >
          All coaches on Reset 360 are certified through approved ERC training
          programs.
        </motion.p>
      </div>
    </section>
  );
};

export default FindCoachHero;
