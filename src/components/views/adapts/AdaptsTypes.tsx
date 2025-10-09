import studentImg from '@/assets/students.png';
import parentImg from '@/assets/parents.png';
import teacherImg from '@/assets/teachers.png';
import collegeImg from '@/assets/college.png';
import Image from 'next/image';

const types = [
  {
    title: 'ADAPTS-S',
    target: 'Students, 6 to 18 years old',
    image: studentImg,
  },
  {
    title: 'ADAPTS-P',
    target: 'Parent`s report of their child',
    image: parentImg,
  },
  {
    title: 'ADAPTS-T',
    target: 'Teachers',
    image: teacherImg,
  },
  {
    title: 'ADAPTS-C',
    target: 'College, young adult',
    image: collegeImg,
  },
];

const AdaptsTypes = () => {
  return (
    <section
      id="types"
      className="pb-16 relative overflow-hidden mx-auto"
      data-aos="fade-up"
      data-aos-delay="0"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">
            ADAPTS Assessments <br /> Understanding Emotional and Behavioral
            Patterns Across Ages
          </h2>
        </div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {types.map((type, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                <h3 className="text-2xl font-semibold text-primary font-robot leading-none">
                  {type.title}
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {type.target}
                </p>
                <div className="relative rounded-sm overflow-hidden">
                  <Image
                    src={type.image}
                    alt={type.title}
                    width={300}
                    height={400}
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center max-w-5xl mx-auto mb-16 px-4">
          <p className="text-xl text-muted-foreground my-6">
            Each version is designed to assess the respondent’s experience of
            symptoms as outlined in the DSM-5. The information could be used for
            diagnostic purposes or as a component for treatment planning.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdaptsTypes;
