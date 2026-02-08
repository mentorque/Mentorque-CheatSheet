import {
  FileCheck,
  FileText,
  RotateCcw,
  Target,
  Calendar,
  Mail,
  AlertCircle,
  CheckCircle2,
  Users,
  GraduationCap,
  Ban,
} from 'lucide-react';

const iconMap = {
  FileCheck,
  FileText,
  RotateCcw,
  Target,
  Calendar,
  Mail,
  AlertCircle,
  CheckCircle2,
  Users,
  GraduationCap,
  Ban,
};

const HowToUseSteps = ({ steps = [], candidateSteps = [], mentorSteps = [] }) => {
  const getIcon = (name) => {
    const Icon = iconMap[name] || CheckCircle2;
    return <Icon className="w-6 h-6 text-blue-400 shrink-0" />;
  };

  return (
    <div className="space-y-6">
      {candidateSteps?.length > 0 && (
        <div>
          <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Your responsibility
          </h4>
          <div className="space-y-4">
            {candidateSteps.map((s, i) => (
              <div key={i} className="flex gap-4 items-start">
                {getIcon(s.icon)}
                <div>
                  <div className="text-white font-medium">{s.title}</div>
                  {s.content && <p className="text-gray-400 text-sm mt-0.5">{s.content}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {mentorSteps?.length > 0 && (
        <div>
          <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Mentor&apos;s responsibility
          </h4>
          <div className="space-y-4">
            {mentorSteps.map((s, i) => (
              <div key={i} className="flex gap-4 items-start">
                {getIcon(s.icon)}
                <div>
                  <div className="text-white font-medium">{s.title}</div>
                  {s.content && <p className="text-gray-400 text-sm mt-0.5">{s.content}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {steps?.length > 0 && (
        <div className="space-y-4">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-4 items-start">
              {getIcon(s.icon)}
              <div>
                <div className="text-white font-medium">{s.title}</div>
                {s.content && <p className="text-gray-400 text-sm mt-0.5">{s.content}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HowToUseSteps;
