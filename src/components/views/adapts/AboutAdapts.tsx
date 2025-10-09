import React from 'react';

const AboutAdapts = () => {
  return (
    <section
      id="adapts"
      className="px-10 py-20 text-center mx-auto"
      data-aos="fade-up"
      data-aos-delay="0"
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold">
        The <span className="text-primary">ADAPTS</span> Model
      </h2>
      <p className="text-2xl font-roboto">
        <span className="text-primary">A</span>nxiety <span className="text-primary">D</span>epression <span className="text-primary">A</span>ssessment
      </p>
      <p className="text-2xl mb-6 font-roboto">
        for <span className="text-primary">P</span>arents <span className="text-primary">T</span>eachers and <span className="text-primary">S</span>tudents
      </p>
      <p className="text-xl text-muted-foreground mb-6">
        ADAPTS is an assessment screening tool which helps schools map, monitor, measure and help mindfully craft supportive programs to make an emotionally and mentally healthy community of learners, parents and teachers.
      </p>
       <p className="text-xl text-muted-foreground">
        A 50-item self-report questionnaire that measures the presence and frequency of depression and anxiety symptoms in children/youth, parents and teachers. The items are in the form of statements to which the child/youth, parent or teacher answer by selecting one appropriate response: NEVER, RARELY, SOMETIMES, OFTEN and ALL THE TIME.
      </p>
      </div>
    </section>
  );
};

export default AboutAdapts;
