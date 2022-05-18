import logo from './logo.svg';
import './App.css';
import AddCandidate from './components/AddCandidate';
import ListCandidate from './components/ListCandidate';
import { Route, Link, BrowserRouter as Router, Routes } from 'react-router-dom'  
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AddCandidate/>}/>
          <Route path="/list" element={<ListCandidate/>}/>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
