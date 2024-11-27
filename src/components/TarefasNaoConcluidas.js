import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TarefasNaoConcluidas() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    carregarTarefasNaoConcluidas();
  }, []);

  const carregarTarefasNaoConcluidas = () => {
    axios.get('http://localhost:5273/api/tarefas/naoconcluidas')
      .then(response => setTarefas(response.data))
      .catch(error => console.error('Erro ao buscar tarefas não concluídas:', error));
  };

  return (
    <div className="tarefas-nao-concluidas-container">
      <h2>Tarefas Não Concluídas</h2>
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

export default TarefasNaoConcluidas;