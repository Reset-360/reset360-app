import { motion } from "framer-motion";
import {
  Activity,
  Users,
  FileDown,
  TrendingUp,
  Receipt,
  Settings2,
} from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Real-Time Participation Tracking",
    description: "See who's started, completed, or pending — updated live.",
  },
  {
    icon: Users,
    title: "Cohort-Level Reporting",
    description:
      "Group insights by department, team, or custom cohorts for deeper analysis.",
  },
  {
    icon: FileDown,
    title: "CSV Export",
    description:
      "Download raw data anytime. Integrate with your existing BI tools seamlessly.",
  },
  {
    icon: TrendingUp,
    title: "Usage Analytics",
    description:
      "Visualize trends over time. Understand engagement patterns at a glance.",
  },
  {
    icon: Receipt,
    title: "Purchase History",
    description:
      "Full audit trail of seat purchases, invoices, and transaction records.",
  },
  {
    icon: Settings2,
    title: "Seat Management System",
    description:
      "Assign, revoke, and redistribute seats with granular admin controls.",
  },
];

const OrgCapabilities = () => {
  return (
    <section className="py-24">
      <div className="container  mx-auto px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text + description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
                Dashboard Capabilities
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Everything You Need to{" "}
                <span className="text-primary">Manage & Measure</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                The Organization Dashboard gives you full visibility and control
                over your mental wellness program. Built for HR leaders, program
                managers, and executive teams.
              </p>

              {/* Mock dashboard preview */}
              <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-elevated">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                  <span className="text-xs text-muted-foreground ml-2 font-medium">
                    Organization Dashboard
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Total Seats", value: "500" },
                    { label: "Completed", value: "347" },
                    { label: "Completion Rate", value: "69.4%" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-background rounded-xl p-3 text-center"
                    >
                      <p className="text-2xl font-display font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Mock chart bars */}
                <div className="flex items-end gap-2 h-20">
                  {[40, 65, 55, 80, 70, 90, 75, 85, 60, 95, 88, 72].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-primary"
                        style={{ height: `${h}%` }}
                      >
                        <div
                          className="w-full rounded-t bg-gradient-cta"
                          style={{ height: `${h * 0.7}%` }}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right: Feature grid */}
            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-card rounded-2xl p-5 border border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-display font-bold text-foreground mb-1.5 text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrgCapabilities;
