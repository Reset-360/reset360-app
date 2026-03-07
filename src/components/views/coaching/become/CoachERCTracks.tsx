import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Track {
  name: string;
  subtitle: string;
  description: string;
  targets: string[];
  color: string;
  image: string;
}

const tracks: Track[] = [
  {
    name: 'Mentora',
    subtitle: 'Mental Health & Wellbeing Coach Program',
    description:
      'Equips leaders to mentor others, build well-being systems, create mental health policies, and launch advocacy projects.',
    targets: [
      'Corporate CSR leaders',
      'NGO heads',
      'Entrepreneurs',
      'School administrators',
      'Guidance counselors',
      'LGU officers',
    ],
    color: 'primary',
    image: '/images/tracks/mentora.png',
  },
  {
    name: 'Thought',
    subtitle: 'Mental Health First Responder',
    description:
      'Teaches crisis de-escalation, emotional first aid, and safe referral techniques for non-clinical frontliners.',
    targets: [
      'Teachers',
      'Barangay health workers',
      'Safety officers',
      'Guidance counselors',
    ],
    color: 'accent',
    image: '/images/tracks/thought.png',
  },
  {
    name: 'David',
    subtitle: 'Mental Health Peer Coaching',
    description:
      'Empowers students to listen without judgment, support peers, and connect them to help.',
    targets: [
      'Senior high school students',
      'College students',
      'Student leaders',
      'Campus organizations',
    ],
    color: 'primary',
    image: '/images/tracks/david.png',
  },
  {
    name: 'BEA',
    subtitle: 'Boldly Embracing Autism & ADHD',
    description:
      'Coaching for parents, caregivers, and educators supporting neurodiverse individuals.',
    targets: [
      'Parents of children with autism or ADHD',
      'SPED teachers',
      'Therapists',
    ],
    color: 'accent',
    image: '/images/tracks/bea.png',
  },
  {
    name: 'Vessel',
    subtitle: 'Socio-Emotional Learning for Teachers',
    description:
      'Teacher training focused on integrating socio-emotional learning tools into classrooms.',
    targets: [
      'Public & private school teachers',
      'Education associations',
      'Teacher training institutions',
    ],
    color: 'primary',
    image: '/images/tracks/vessel.png',
  },
  {
    name: 'Tiwala',
    subtitle: 'Recovery Coaching',
    description:
      'Addiction recovery coaching grounded in Filipino psychology and the Philippine Addiction Specialists Society.',
    targets: [
      'NGO workers',
      'Faith-based volunteers',
      'Family members supporting recovery',
      'Barangay leaders',
    ],
    color: 'accent',
    image: '/images/tracks/tiwala.png',
  },
];

const CoachERCTracks = () => (
  <section id="tracks" className="py-24 bg-gradient-sage">
    <div className="container mx-auto px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">
          ERC Certification Tracks
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Choose the Track That Fits{' '}
          <span className="text-primary">Your Calling</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Each track prepares coaches for a specific area of mental wellness
          support.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tracks.map((track, i) => (
          <motion.div
            key={track.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i }}
            className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden flex flex-col"
          >
            {/* Header band */}
            <div
              className={`px-6 py-4 ${track.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
                }`}
            >
              <div className="flex  items-center justify-between">
                <div>
                  <h3
                    className={`font-display text-xl font-bold ${track.color === 'accent' ? 'text-accent' : 'text-primary'
                      }`}
                  >
                    {track.name}
                  </h3>
                  <p className="text-sm font-medium text-foreground mt-0.5">
                    {track.subtitle}
                  </p>
                </div>

                <Image
                  src={track.image}
                  alt={track.name}
                  width={70}
                  height={70}
                  className='object-cover'
                />
              </div>
            </div>

            <div className="px-6 py-5 flex flex-col flex-1">
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {track.description}
              </p>

              <div className="mb-5 flex-1">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                  Target Audience
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {track.targets.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-muted text-muted-foreground rounded-full px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full rounded-full border-primary/30 hover:bg-primary/5"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CoachERCTracks;
