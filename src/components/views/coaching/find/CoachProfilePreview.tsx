import { motion } from "framer-motion";
import {
  MapPin,
  Monitor,
  Coffee,
  Star,
  Calendar,
  Award,
  Clock,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CoachProfilePreviewProps {
  open: boolean;
  onClose: () => void;
}

const timeSlots = ["9:00 AM", "10:30 AM", "1:00 PM", "3:00 PM", "4:30 PM"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const CoachProfilePreview = ({ open, onClose }: CoachProfilePreviewProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card rounded-2xl border border-border/50 shadow-elevated max-w-lg w-full max-h-[85vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-border/50 flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shrink-0">
            MS
          </div>
          <div className="flex-1">
            <h3 className="font-display text-xl font-bold text-foreground">
              Maria Santos
            </h3>
            <p className="text-sm text-primary font-medium">
              Mentora Certified Coach
            </p>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-accent text-accent" /> 4.9
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Makati City
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Bio */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1.5">
              About
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A passionate mental wellness advocate with 5+ years of experience
              in corporate wellbeing programs. Specializes in leadership
              coaching, stress management, and building resilient teams.
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Award className="w-4 h-4 text-primary" />
              Mentora Track
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              5 years exp.
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Monitor className="w-4 h-4 text-primary" />
              Online sessions
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Coffee className="w-4 h-4 text-primary" />
              In-person sessions
            </div>
          </div>

          {/* Availability */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" /> Availability
            </h4>
            <div className="grid grid-cols-5 gap-2">
              {days.map((day) => (
                <div key={day} className="text-center">
                  <p className="text-xs font-semibold text-foreground mb-1.5">
                    {day}
                  </p>
                  {timeSlots.slice(0, Math.floor(Math.random() * 3) + 2).map((t) => (
                    <span
                      key={`${day}-${t}`}
                      className="block text-[10px] bg-primary/10 text-primary rounded-md px-1 py-1 mb-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full rounded-full bg-gradient-cta text-primary-foreground hover:opacity-90 transition-opacity h-12 text-base">
            Book Session
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CoachProfilePreview;
