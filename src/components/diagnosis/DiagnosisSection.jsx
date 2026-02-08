import ReactMarkdown from 'react-markdown';
import SpiderGraph from './SpiderGraph';
import Stepper from './Stepper';
import MockGraphs from './MockGraphs';
import ExpectedOutcomeGraph from './ExpectedOutcomeGraph';
import HowToUseSteps from './HowToUseSteps';

const markdownClasses = "text-gray-300 text-base leading-relaxed [&_strong]:text-white [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-4 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-4 [&_p]:mb-2 [&_h3]:text-white [&_h3]:font-medium [&_h3]:mt-4 [&_h3]:mb-2";

const DiagnosisSection = ({ section }) => {
  const type = section.sectionType || 'content';
  const hasContent = section.content && section.content.trim();

  return (
    <div className="space-y-4">
      {/* Section-specific visuals */}
      {type === 'spider' && section.spiderGraph && (
        <div className="flex justify-center pt-2 pb-2">
          <SpiderGraph
            labels={section.spiderGraph.labels || []}
            values={section.spiderGraph.values || []}
            maxValue={section.spiderGraph.maxValue ?? 5}
            size={420}
          />
        </div>
      )}
      {type === 'stepper' && section.steps && section.steps.length > 0 && (
        <Stepper steps={section.steps} />
      )}
      {type === 'mockGraphs' && section.graphs && section.graphs.length > 0 && (
        <MockGraphs graphs={section.graphs} />
      )}
      {type === 'expectedOutcome' && (
        <ExpectedOutcomeGraph
          currentScore={section.currentScore}
          targetScore={section.targetScore}
          maxScore={section.maxScore ?? 10}
          metrics={section.metrics || []}
        />
      )}
      {type === 'howToUse' && (
        <HowToUseSteps
          steps={section.steps}
          candidateSteps={section.candidateSteps}
          mentorSteps={section.mentorSteps}
        />
      )}

      {/* Markdown content */}
      {hasContent && (
        <div className={markdownClasses}>
          <ReactMarkdown>{section.content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default DiagnosisSection;
