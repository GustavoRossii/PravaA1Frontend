import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TarefaList() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = () => {
    axios.get('http://localhost:5273/api/tarefas/listar')
      .then(response => setTarefas(response.data))
      .catch(error => console.error('Erro ao buscar tarefas:', error));
  };

  return (
    <div className="tarefa-list-container">
      <h2>Lista de Tarefas</h2>
      <div className="tarefa-grid">
        {tarefas.map(tarefa => (
          <div key={tarefa.tarefaId} className="tarefa-card">
            <h3>{tarefa.titulo}</h3>
            <p>{tarefa.descricao}</p>
            <p><strong>Status:</strong> {tarefa.status}</p>
            <Link to={`/tarefas/alterar/${tarefa.tarefaId}`} className="btn-alterar">Alterar</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TarefaList;