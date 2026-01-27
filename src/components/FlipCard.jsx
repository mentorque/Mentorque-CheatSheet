import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

const FlipCard = ({ data, isFlipped: externalFlipped, onFlip }) => {
  const [internalFlipped, setInternalFlipped] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const isFlipped = externalFlipped !== undefined ? externalFlipped : internalFlipped;

  const handleFlip = () => {
    if (onFlip) {
      onFlip();
    } else {
      setInternalFlipped(!internalFlipped);
    }
  };

  // Handle different data structures
  const front = data?.front || data?.question || data?.title || '';
  const back = data?.back || data?.answer || data?.description || '';

  return (
    <div className="flip-card-container" onClick={handleFlip}>
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front of Card */}
        <div className="flip-card-front">
          <div className="relative w-full h-full backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20 hover:shadow-2xl hover:shadow-blue-400/10 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/[0.08] before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 flex flex-col items-center justify-center">
            <div className="relative z-10">
              <h3 className="text-xl lg:text-2xl text-white mb-4 drop-shadow-sm">
                {front}
              </h3>
              <p className="text-gray-400 text-sm">Click to flip</p>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/[0.03] via-transparent to-purple-600/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Back of Card */}
        <div className="flip-card-back">
          <div className="relative w-full h-full backdrop-blur-xl bg-white/[0.06] border-2 border-white/25 rounded-2xl p-6 shadow-2xl shadow-blue-400/20 overflow-y-auto">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-blue-400 font-semibold">
                  {front}
                </h3>
                <RotateCcw className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-200 text-base leading-relaxed whitespace-pre-line">
                {back}
              </p>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/[0.08] via-transparent to-purple-600/[0.05]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
