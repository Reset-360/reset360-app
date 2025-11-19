import Image from 'next/image';

type EmotionalProfileHeaderProps = {
  title?: string;
  description?: string;
};

export const EmotionalProfileHeader: React.FC<EmotionalProfileHeaderProps> = ({
  title = 'ADAPTS Emotional Profile',
  description = 'Here is a summary of how your emotional patterns showed up in this assessment. This is not a diagnosis. It is a snapshot that can guide your next step in support and self care.',
}) => (
  <header className="space-y-2 text-center">
    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent/5 flex items-center justify-center">
        <Image
          src="/logo/logo_250.png"
          width={50}
          height={50}
          alt="Reset 360 Logo"
        />
      </div>
    </div>

    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
    <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
      {description}
    </p>
  </header>
);
