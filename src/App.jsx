import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheatSheet from './components/CheatSheet';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CheatSheet />} />
          <Route path="/cheatsheet" element={<CheatSheet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

