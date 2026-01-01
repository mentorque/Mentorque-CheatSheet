import { Users, Target, Award, CheckCircle, Star, Clock, Zap, RotateCcw } from 'lucide-react';

const iconMap = {
  Users: Users,
  Target: Target,
  Award: Award,
  CheckCircle: CheckCircle,
  Star: Star,
  Clock: Clock,
  Zap: Zap,
  RotateCcw: RotateCcw,
};

export const getIcon = (iconName, className = "w-8 h-8") => {
  const IconComponent = iconMap[iconName];
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in iconMap. Using Users as fallback.`);
    return <Users className={className} />;
  }
  return <IconComponent className={className} />;
};

export default iconMap;

