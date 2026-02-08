import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Lottie from 'lottie-react';
import DiagnosisSection from './diagnosis/DiagnosisSection';

const SECTION_TRANSITION_MS = 600;

const CandidateDiagnosis = () => {
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    fetch('/note.json')
      .then((r) => r.json())
      .then(setLottieData)
      .catch(() => setLottieData(null));
  }, []);

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

  const goToSection = useCallback((targetIndex) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentSection(targetIndex);
      setTransitioning(false);
    }, SECTION_TRANSITION_MS);
  }, [transitioning]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          {lottieData ? (
            <div className="w-52 h-52 mx-auto flex items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 p-4">
              <Lottie animationData={lottieData} loop style={{ width: '100%', height: '100%' }} />
            </div>
          ) : (
            <div className="w-12 h-12 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          )}
          <div className="text-white text-xl mt-4">Loading diagnosis...</div>
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
            to="/developer/list"
            className="inline-block px-6 py-3 bg-blue-400 text-white rounded-xl font-medium hover:bg-blue-500 transition-colors"
          >
            View Developer Resources
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
        {/* Logo at top - same as homepage, appropriate size */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-black rounded-sm"></div>
          </div>
          <span className="text-white font-bold text-2xl">Mentorque</span>
        </div>

        {/* Header */}
        <div className="mb-8">
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
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-6 min-h-[320px] relative">
              {transitioning && lottieData && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl z-10">
                  <div className="w-40 h-40 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 p-3">
                    <Lottie animationData={lottieData} loop style={{ width: '100%', height: '100%' }} />
                  </div>
                </div>
              )}
              {!transitioning && (
                <>
                  <h2 className="text-xl font-semibold text-blue-400 mb-4">
                    {currentSection + 1}. {section.title}
                  </h2>
                  <DiagnosisSection section={section} />
                </>
              )}
            </div>

            {/* Chevron navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => goToSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0 || transitioning}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.1] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
              <span className="text-gray-400 text-sm">
                {currentSection + 1} of {totalSections}
              </span>
              <button
                onClick={() => goToSection(Math.min(totalSections - 1, currentSection + 1))}
                disabled={currentSection === totalSections - 1 || transitioning}
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
