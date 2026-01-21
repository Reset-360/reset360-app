import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DisclosureSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card/20 rounded-xl border border-border overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-primary/20 transition-colors"
      >
        <div>
          <h3 className="text-lg font-semibold text-foreground">ADAPTS Disclosure and Limitations</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Important information about this assessment tool
          </p>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>
      
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-[1000px]" : "max-h-0"
        )}
      >
        <div className="px-6 pb-6 space-y-4 text-sm text-foreground/80 leading-relaxed border-t border-border pt-4">
          <p>
            This assessment was developed to support self-reflection, coaching conversations, 
            and preliminary screening related to symptoms of depression and anxiety.
          </p>
          
          <p>
            At this time, the instrument has not undergone formal validation or reliability 
            testing and therefore <strong className="text-foreground">should not be used for diagnosis, clinical 
            decision-making, treatment planning, or insurance determinations.</strong>
          </p>
          
          <p>
            Scores are not definitive and should be considered one source of information among 
            many, including clinical interviews and professional judgment.
          </p>
          
          <p>
            Individuals experiencing significant distress, impairment, or thoughts of self-harm 
            are strongly encouraged to seek evaluation from a licensed mental health professional.
          </p>
          
          <p>
            This screening tool is part of ERC&apos;s growing effort to make mental health reflection 
            more accessible. Transparency about its current limitations is intentional and reflects 
            our commitment to ethical practice. Ongoing research and validation efforts may be 
            conducted in the future to further establish the assessment&apos;s psychometric properties.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclosureSection;
