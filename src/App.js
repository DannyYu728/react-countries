import './App.css';
import { Routes, Route } from "react-router-dom";
import Wrapper from './Wrapper';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/countries" element={<Wrapper />}></Route>
    </Routes>

    </div>
  );
}

export default App;
