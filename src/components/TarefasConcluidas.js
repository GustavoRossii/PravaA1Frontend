import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TarefasConcluidas() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    carregarTarefasConcluidas();
  }, []);

  const carregarTarefasConcluidas = () => {
    axios.get('http://localhost:5273/api/tarefas/concluidas')
      .then(response => setTarefas(response.data))
      .catch(error => console.error('Erro ao buscar tarefas concluídas:', error));
  };

  return (
    <div className="tarefas-concluidas-container">
      <h2>Tarefas Concluídas</h2>
      <div className="tarefa-grid">
        {tarefas.map(tarefa => (
          <div key={tarefa.tarefaId} className="tarefa-card">
            <h3>{tarefa.titulo}</h3>
            <p>{tarefa.descricao}</p>
            <p><strong>Categoria:</strong> {tarefa.categoria.nome}</p>
            <Link to={`/tarefas/alterar/${tarefa.tarefaId}`} className="btn-alterar">Alterar</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TarefasConcluidas; 