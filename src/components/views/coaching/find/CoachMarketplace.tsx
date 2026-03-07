import { motion } from "framer-motion";
import { MapPin, Monitor, Coffee, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function transformTrack(track: string) {
  return `${track} Certified`;
}

type Coach = {
  name: string;
  photo: string;
  track: string;
  specialization: string;
  distance: string;
  sessionTypes: string[];
  rating: number;
};

const sampleCoaches: Coach[] = [
  {
    name: "Maria Santos",
    photo: "MS",
    track: "Mentora",
    specialization: "Leadership Wellbeing",
    distance: "2.3 km",
    sessionTypes: ["Online", "In-Person"],
    rating: 4.9,
  },
  {
    name: "James Reyes",
    photo: "JR",
    track: "Thought",
    specialization: "Crisis Support",
    distance: "4.1 km",
    sessionTypes: ["In-Person"],
    rating: 4.8,
  },
  {
    name: "Anna Cruz",
    photo: "AC",
    track: "David",
    specialization: "Student Peer Support",
    distance: "1.8 km",
    sessionTypes: ["Online"],
    rating: 5.0,
  },
  {
    name: "Paolo Mendoza",
    photo: "PM",
    track: "Tiwala",
    specialization: "Recovery Coaching",
    distance: "5.6 km",
    sessionTypes: ["Online", "In-Person"],
    rating: 4.7,
  },
  {
    name: "Grace Villanueva",
    photo: "GV",
    track: "BEA",
    specialization: "Autism & ADHD Support",
    distance: "3.2 km",
    sessionTypes: ["Online"],
    rating: 4.9,
  },
  {
    name: "Rico Bautista",
    photo: "RB",
    track: "Vessel",
    specialization: "SEL for Educators",
    distance: "6.0 km",
    sessionTypes: ["In-Person"],
    rating: 4.6,
  },
];

const distanceOptions = ["All", "3 km", "5 km", "10 km"];
const trackOptions = ["All", "Mentora", "Thought", "David", "BEA", "Vessel", "Tiwala"];

const CoachCard = ({ coach, index }: { coach: Coach; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.05 * index }}
    className="bg-card rounded-2xl border border-border/50 shadow-card p-5 flex flex-col"
  >
    <div className="flex gap-4 mb-4">
      {/* Avatar */}
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
        {coach.photo}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg font-semibold text-foreground">
          {coach.name}
        </h3>
        <p className="text-sm text-primary font-medium">{transformTrack(coach.track)}</p>
      </div>
      <div className="flex items-center gap-1 text-accent shrink-0">
        <Star className="w-4 h-4 fill-accent" />
        <span className="text-sm font-semibold">{coach.rating}</span>
      </div>
    </div>

    <p className="text-sm text-muted-foreground mb-3">
      <span className="font-medium text-foreground">Specialization:</span>{" "}
      {coach.specialization}
    </p>

    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
      <span className="flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5" />
        {coach.distance} away
      </span>
      <div className="flex items-center gap-1.5">
        {coach.sessionTypes.includes("Online") && (
          <span className="flex items-center gap-1">
            <Monitor className="w-3.5 h-3.5" /> Online
          </span>
        )}
        {coach.sessionTypes.includes("In-Person") && (
          <span className="flex items-center gap-1">
            <Coffee className="w-3.5 h-3.5" /> In-Person
          </span>
        )}
      </div>
    </div>

    <div className="flex gap-2 mt-auto">
      <Button
        variant="outline"
        className="flex-1 rounded-full border-primary/30 hover:bg-primary/5"
      >
        View Profile
      </Button>
      <Button className="rounded-full">
        Book Session
      </Button>
    </div>
  </motion.div>
);

const CoachMarketplace = () => {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [activeDistance, setActiveDistance] = useState("5 km");

  const [coaches, setCoaches] = useState<Coach[]>(sampleCoaches);

  const parseDistance = (distance: string) => parseFloat(distance);

  useEffect(() => {
  setCoaches(
    sampleCoaches.filter((coach) => {
      const matchesTrack =
        activeTrack && activeTrack !== "All" ? coach.track === activeTrack : true;

      const matchesDistance =
        activeDistance && activeDistance !== "All"
          ? parseDistance(coach.distance) <= parseDistance(activeDistance)
          : true;

      return matchesTrack && matchesDistance;
    })
  );
}, [activeTrack, activeDistance]);


  return (
    <section id='marketplace' className="py-20">
      <div className="container mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Coaches <span className="text-primary">Near You</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Browse certified coaches and find the right match for your needs.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-60 shrink-0"
          >
            <div className="bg-card rounded-2xl border border-border/50 shadow-soft p-5 space-y-5 lg:sticky lg:top-24">
              {/* Distance */}
              <div>
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                  Distance Radius
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {distanceOptions.map((d) => (
                    <button
                      key={d}
                      onClick={() => setActiveDistance(d)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        activeDistance === d
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-muted-foreground border-border hover:border-primary/40"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Coaching Track */}
              <div>
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                  Coaching Track
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {trackOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() =>
                        setActiveTrack(activeTrack === t ? null : t)
                      }
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        activeTrack === t
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-muted-foreground border-border hover:border-primary/40"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Coach grid */}
          <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {coaches.map((coach, i) => (
              <CoachCard key={coach.name} coach={coach} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachMarketplace;
