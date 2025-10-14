'use client';

import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import CoachCard from './CoachCard';
import { Coach } from '@/types/coach';
import SliderArrow from '@/components/general/SliderArrow';

const coaches: Coach[] = [
  {
    name: 'Sarah Mitchell',
    specialty: 'Stress & Anxiety',
    experience: '8 years',
    rating: 4.9,
    sessions: 2400,
    available: true,
    tags: ['Career Stress', 'Work-Life Balance', 'Mindfulness'],
  },
  {
    name: 'David Chen',
    specialty: 'Life Transitions',
    experience: '6 years',
    rating: 4.8,
    sessions: 1800,
    available: true,
    tags: ['Major Changes', 'Relationships', 'Self-Discovery'],
  },
  {
    name: 'Maya Patel',
    specialty: 'Personal Growth',
    experience: '10 years',
    rating: 5.0,
    sessions: 3200,
    available: false,
    tags: ['Confidence', 'Goal Setting', 'Motivation'],
  },
  {
    name: 'Daniel Lee',
    specialty: 'Mindset & Motivation',
    experience: '7 years',
    rating: 4.7,
    sessions: 1500,
    available: true,
    tags: ['Resilience', 'Focus', 'Goal Setting'],
  },
  {
    name: 'Elena Rodriguez',
    specialty: 'Emotional Wellness',
    experience: '9 years',
    rating: 4.9,
    sessions: 2700,
    available: true,
    tags: ['Self-Esteem', 'Emotional Regulation', 'Inner Peace'],
  },
  {
    name: 'James Okafor',
    specialty: 'Career Coaching',
    experience: '5 years',
    rating: 4.8,
    sessions: 1600,
    available: true,
    tags: ['Leadership', 'Career Transitions', 'Workplace Strategy'],
  },
];

const CoachPreview: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: false,
    renderMode: 'performance' as const,
    slides: { perView: 1, spacing: 12 },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 2, spacing: 12 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 12 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <section id="coaches" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold font-main mb-6">
            Meet Your <span className="text-primary">Coaches</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Experienced, empathetic professionals ready to support your journey
          </p>
        </div>

        <div className="navigation-wrapper max-w-6xl mx-auto">
          <div ref={sliderRef} className="keen-slider">
            {coaches.map((coach, index) => (
              <CoachCard key={index} coach={coach} />
            ))}
          </div>

          {loaded && instanceRef.current && (
            <>
              <SliderArrow
                left
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />

              <SliderArrow
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CoachPreview;
