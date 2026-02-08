const Stepper = ({ steps = [] }) => {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-400/20 border-2 border-blue-400 flex items-center justify-center shrink-0">
              <span className="text-blue-400 font-bold text-sm">{i + 1}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-0.5 flex-1 min-h-[24px] bg-blue-400/30 my-1" />
            )}
          </div>
          <div className="pb-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-blue-400 font-semibold text-sm">
                {step.week || `Step ${i + 1}`}
              </span>
            </div>
            <h4 className="text-white font-medium mb-1">{step.title}</h4>
            {step.content && (
              <p className="text-gray-400 text-sm">{step.content}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
