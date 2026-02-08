const MockGraphs = ({ graphs = [] }) => {
  return (
    <div className="space-y-8">
      {graphs.map((graph, gi) => (
        <div key={gi} className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-4">
          <h4 className="text-blue-400 font-semibold mb-4">{graph.title}</h4>
          {graph.type === 'timeline' && graph.data && (
            <div className="space-y-3">
              {graph.data.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-20 shrink-0 text-right">
                    <span className="text-gray-500 text-sm">{item.timing}</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <div className="flex-1 pb-4">
                    <div className="font-medium text-white">{item.label}</div>
                    <div className="text-gray-400 text-sm mt-0.5">{item.duration}</div>
                    {item.objective && (
                      <p className="text-gray-500 text-xs mt-1">{item.objective}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {graph.type === 'bar' && graph.data && (
            <div className="space-y-2">
              {graph.data.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-blue-400 font-medium">{item.value}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400/70 rounded-full transition-all"
                      style={{ width: `${Math.min(100, (item.value / (item.max || 10)) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MockGraphs;
