import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TarefaList from './components/TarefaList';
import TarefaForm from './components/TarefaForm';
import TarefaAlterar from './components/TarefaAlterar';
import TarefasNaoConcluidas from './components/TarefasNaoConcluidas';
import TarefasConcluidas from './components/TarefasConcluidas';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo">
              TaskManager
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/tarefas" className="nav-link">Listar Tarefas</Link>
              </li>
              <li className="nav-item">
                <Link to="/tarefas/nova" className="nav-link">Nova Tarefa</Link>
              </li>
              <li className="nav-item">
                <Link to="/tarefas/naoconcluidas" className="nav-link">Não Concluídas</Link>
              </li>
              <li className="nav-item">
                <Link to="/tarefas/concluidas" className="nav-link">Concluídas</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/tarefas" element={<TarefaList />} />
            <Route path="/tarefas/nova" element={<TarefaForm />} />
            <Route path="/tarefas/alterar/:id" element={<TarefaAlterar />} />
            <Route path="/tarefas/naoconcluidas" element={<TarefasNaoConcluidas />} />
            <Route path="/tarefas/concluidas" element={<TarefasConcluidas />} />
            <Route path="/" element={<h1>Bem-vindo ao Gerenciador de Tarefas</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;