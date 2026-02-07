import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const CandidateDiagnosis = () => {
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      if (!name) {
        setError('No candidate name provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/Diagnosis-Info/${name}.json`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`404 - Diagnosis not found for: ${name}`);
          }
          throw new Error(`Failed to load data: ${response.status} ${response.statusText}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error('Error loading diagnosis:', err);
        setError(`Could not load diagnosis for: ${name}. ${err.message || 'Make sure the JSON file exists.'}`);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [name]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <div className="text-white text-xl">Loading diagnosis...</div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center text-white max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Diagnosis not found</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link
            to="/Candidate-diagnosis"
            className="inline-block px-6 py-3 bg-blue-400 text-white rounded-xl font-medium hover:bg-blue-500 transition-colors"
          >
            ← Back to List
          </Link>
        </div>
      </div>
    );
  }

  const sections = data.sections || [];
  const section = sections[currentSection];
  const totalSections = sections.length;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/Candidate-diagnosis"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            Interview Prep Prescription
          </h1>
          <p className="text-gray-400">
            {data.name}
            {data.email && ` • ${data.email}`}
            {data.targetRole && ` • ${data.targetRole}`}
          </p>
        </div>

        {/* Section content with chevron navigation */}
        {section && (
          <>
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">
                {currentSection + 1}. {section.title}
              </h2>
              <div className="text-gray-300 text-base leading-relaxed [&_strong]:text-white [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-4 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-4 [&_p]:mb-2 [&_h3]:text-white [&_h3]:font-medium [&_h3]:mt-4 [&_h3]:mb-2">
                <ReactMarkdown>
                  {section.content}
                </ReactMarkdown>
              </div>
            </div>

            {/* Chevron navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentSection((p) => Math.max(0, p - 1))}
                disabled={currentSection === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.1] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
              <span className="text-gray-400 text-sm">
                {currentSection + 1} of {totalSections}
              </span>
              <button
                onClick={() => setCurrentSection((p) => Math.min(totalSections - 1, p + 1))}
                disabled={currentSection === totalSections - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.1] transition-colors"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CandidateDiagnosis;
