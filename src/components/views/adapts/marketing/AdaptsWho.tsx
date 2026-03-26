import { motion } from 'framer-motion';
import { GraduationCap, Users, BookOpen, Building2 } from 'lucide-react';
import studentImg from '@/assets/students.png';
import parentImg from '@/assets/parents.png';
import teacherImg from '@/assets/teachers.png';
import collegeImg from '@/assets/college.png';
import Image from 'next/image';

const versions = [
  {
    code: 'ADAPTS-S',
    title: 'Students',
    description: 'Self‑assessment for students ages 13–18',
    icon: GraduationCap,
    image: studentImg,
  },
  {
    code: 'ADAPTS-P',
    title: 'Parent Report',
    description: 'Parent self‑assessment of emotional well‑being',
    icon: Users,
    image: parentImg,
  },
  {
    code: 'ADAPTS-T',
    title: 'Teachers',
    description: 'Designed for teachers to assess their personal well‑being',
    icon: BookOpen,
    image: teacherImg,
  },
  {
    code: 'ADAPTS-C',
    title: 'College & Young Adults',
    description: 'Designed for individuals in higher education and those transitioning into adulthood',
    icon: Building2,
    image: collegeImg,
  },
];

const AdaptsWho = () => (
  <section id='who' className="py-24 bg-gradient-to-b from-background/10 via-accent/5  to-accent/10 ">
    <div className="container px-10 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
          Assessment Versions
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Who is <span className="text-primary">ADAPTS</span> For?
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Each version is designed to ensure age-appropriate screening while
          maintaining structured symptom measurement.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {versions.map((v, i) => (
          <motion.div
            key={v.code}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative bg-card rounded-2xl  shadow-card hover:shadow-elevated transition-all duration-300 border border-border/50 text-center"
          >
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-cta opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="h-50 relative overflow-hidden rounded-t-2xl">
              <Image
                src={v.image}
                alt={v.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                layout="fill"
              />
            </div>

            <div className='p-4'>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <v.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="inline-block text-xs font-bold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                {v.code}
              </span>
              <h3 className="text-lg font-display font-bold text-foreground mb-2">
                {v.title}
              </h3>
              <p className="text-sm text-muted-foreground">{v.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AdaptsWho;
