import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center px-4">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
            <div className="w-10 h-10 bg-black rounded-sm"></div>
          </div>
          <span className="text-white font-bold text-5xl">Mentorque</span>
        </div>
        <Link
          to="/developer/list"
          className="inline-block px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
        >
          View Developer Resources
        </Link>
      </div>
    </div>
  );
};

export default Welcome;

