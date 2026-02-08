import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheatSheet from './components/CheatSheet';
import Welcome from './components/Welcome';
import TestValidator from './components/TestValidator';
import DeveloperList from './components/DeveloperList';
import CandidateDiagnosis from './components/CandidateDiagnosis';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/developer/list" element={<DeveloperList />} />
          <Route path="/test" element={<TestValidator />} />
          <Route path="/Cheatsheet/:name" element={<CheatSheet />} />
          <Route path="/Candidate-diagnosis/:name" element={<CandidateDiagnosis />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

