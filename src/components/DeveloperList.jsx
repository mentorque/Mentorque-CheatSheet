import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Loader2, BookOpen, Stethoscope } from 'lucide-react';

const DeveloperList = () => {
  const [cheatsheets, setCheatsheets] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [manifestRes, diagnosisRes] = await Promise.all([
          fetch('/manifest.json'),
          fetch('/diagnosis-manifest.json'),
        ]);

        if (manifestRes.ok) {
          const manifest = await manifestRes.json();
          setCheatsheets(manifest.cheatsheets || []);
        }
        if (diagnosisRes.ok) {
          const diagnosisManifest = await diagnosisRes.json();
          setDiagnoses(diagnosisManifest.diagnoses || []);
        } else {
          setDiagnoses([{ name: 'raajit', displayName: 'Raajit' }]);
        }
      } catch (err) {
        setDiagnoses([{ name: 'raajit', displayName: 'Raajit' }]);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-black rounded-sm"></div>
            </div>
            <span className="text-white font-bold text-2xl">Mentorque</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Developer Resources
          </h1>
          <p className="text-gray-300 text-lg">
            Choose a cheatsheet or candidate diagnosis
          </p>
        </div>

        {/* Cheatsheets section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Cheatsheets
          </h2>
          {cheatsheets.length === 0 ? (
            <p className="text-gray-500">No cheatsheets found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cheatsheets.map((cs) => (
                <Link
                  key={cs.name}
                  to={`/Cheatsheet/${cs.name}`}
                  className="group backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center group-hover:bg-blue-400/30 transition-colors">
                      <FileText className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {cs.displayName || cs.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{cs.name}.json</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Candidate Diagnosis section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <Stethoscope className="w-5 h-5" />
            Candidate Diagnosis
          </h2>
          {diagnoses.length === 0 ? (
            <p className="text-gray-500">No diagnoses found</p>
          ) : (
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
          )}
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeveloperList;
