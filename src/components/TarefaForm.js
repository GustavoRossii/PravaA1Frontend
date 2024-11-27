import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

function TarefaForm() {
  const [tarefa, setTarefa] = useState({
    titulo: '',
    descricao: ''
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setTarefa({ ...tarefa, [e.target.name]: e.target.value });
  };

  const API_URL = 'http://localhost:5273'; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      console.log('Enviando tarefa:', tarefa);
      const response = await axios.post(`${API_URL}/api/tarefas/cadastrar`, tarefa, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      console.log('Resposta do servidor:', response.data);
      setMessage({ type: 'success', text: 'Tarefa cadastrada com sucesso!' });
      setTarefa({ titulo: '', descricao: '' });
    } catch (error) {
      console.error('Erro ao cadastrar tarefa:', error);
      setMessage({ type: 'error', text: `Erro ao cadastrar tarefa: ${error.message}` });
    }
  };

  return (
    <div className="tarefa-form-container">
      <h2>Cadastrar Nova Tarefa</h2>
      <form onSubmit={handleSubmit} className="tarefa-form">
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input type="text" id="titulo" name="titulo" value={tarefa.titulo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea id="descricao" name="descricao" value={tarefa.descricao} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn-cadastrar">Cadastrar</button>
      </form>
      {message && <div className={`message ${message.type}`}>{message.text}</div>}
    </div>
  );
}

export default TarefaForm;
