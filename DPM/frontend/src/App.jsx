import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Web from './components/webs'
import ProductList from './components/machine'
import NavBar from './components/nav';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/prediction" element={<Web />} />
        <Route path="/product" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;