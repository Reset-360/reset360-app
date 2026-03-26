import { Wind, Leaf, RefreshCw, Heart, BookOpen } from "lucide-react";
import { TechniqueId } from './content';

const ICON_MAP: Record<TechniqueId, React.ElementType> = {
  breathing: Wind,
  grounding: Leaf,
  reframing: RefreshCw,
  bodyscan: Heart,
  journaling: BookOpen,
};

type TechniqueIconProps = {
  id: TechniqueId;
  className?: string;
};

export function TechniqueIcon({ id, className }: TechniqueIconProps) {
  const Icon = ICON_MAP[id];
  return <Icon className={`w-5 h-5 ${className ?? ""}`} />;
}