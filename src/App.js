import React from "react";
import Home from './Home';
import './App.css';
import ClientEdit from "./ClientEdit";
import ClientList from "./ClientList";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/clients' element={<ClientList />} />
        <Route path='/clients/:id' element={<ClientEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
