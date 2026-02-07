import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheatSheet from './components/CheatSheet';
import Welcome from './components/Welcome';
import TestValidator from './components/TestValidator';
import CheatSheetList from './components/CheatSheetList';
import DiagnosisList from './components/DiagnosisList';
import CandidateDiagnosis from './components/CandidateDiagnosis';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/list" element={<CheatSheetList />} />
          <Route path="/test" element={<TestValidator />} />
          <Route path="/Candidate-diagnosis" element={<DiagnosisList />} />
          <Route path="/Candidate-diagnosis/:name" element={<CandidateDiagnosis />} />
          <Route path="/:name" element={<CheatSheet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

