import { ArrowRight, TrendingUp } from 'lucide-react';

const ExpectedOutcomeGraph = ({ currentScore = 4.5, targetScore = 7, maxScore = 10, metrics = [] }) => {
  const currentPct = (currentScore / maxScore) * 100;
  const targetPct = (targetScore / maxScore) * 100;
  const increase = targetScore - currentScore;

  return (
    <div className="space-y-6">
      {/* Score progression bar with arrow to desired outcome */}
      <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-400">Current Score</span>
          <span className="text-white font-bold text-2xl">{currentScore}/{maxScore}</span>
        </div>
        <div className="relative h-6 bg-white/5 rounded-full overflow-hidden">
          {/* Current score (gray) */}
          <div
            className="absolute inset-y-0 left-0 bg-gray-500/60 rounded-l-full"
            style={{ width: `${currentPct}%` }}
          />
          {/* Increase zone with arrow (blue) */}
          <div
            className="absolute inset-y-0 flex items-center justify-end pr-1 bg-blue-400/80"
            style={{ left: `${currentPct}%`, width: `${targetPct - currentPct}%` }}
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
          {/* Target line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-green-400"
            style={{ left: `${targetPct}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-gray-500 text-sm">Baseline</span>
          <span className="text-green-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Target: {targetScore}/{maxScore}
            <span className="text-blue-400 text-sm font-normal">(+{increase} increase)</span>
          </span>
        </div>
      </div>
      {metrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {metrics.map((m, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-white/[0.03] rounded-lg">
              <span className="text-gray-400 text-sm">{m.label}</span>
              <span className="text-blue-400 font-medium">
                {m.current} → <span className="text-green-400">{m.target}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpectedOutcomeGraph;
