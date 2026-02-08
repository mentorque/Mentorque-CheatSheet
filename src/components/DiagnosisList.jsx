import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Loader2 } from 'lucide-react';

const DiagnosisList = () => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDiagnoses = async () => {
      try {
        const response = await fetch('/diagnosis-manifest.json');
        if (response.ok) {
          const manifest = await response.json();
          setDiagnoses(manifest.diagnoses || []);
        } else {
          setDiagnoses([{ name: 'raajit', displayName: 'Raajit' }]);
        }
      } catch (err) {
        setDiagnoses([{ name: 'raajit', displayName: 'Raajit' }]);
      } finally {
        setLoading(false);
      }
    };

    loadDiagnoses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Candidate Diagnosis
          </h1>
          <p className="text-gray-300 text-lg">
            Select a candidate to view their interview prep prescription
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {diagnoses.map((d) => (
            <Link
              key={d.name}
              to={`/Candidate-diagnosis/${d.name}`}
              className="group backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center group-hover:bg-blue-400/30 transition-colors">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {d.displayName || d.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{d.name}.json</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/Candidate-diagnosis"
            className="inline-block px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
          >
            ← Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisList;
