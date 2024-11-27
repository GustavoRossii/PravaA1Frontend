import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function TarefaAlterar() {
  const [tarefa, setTarefa] = useState({
    titulo: '',
    descricao: '',
    categoriaId: '',
    status: ''
  });
  const [categorias, setCategorias] = useState([]);
  const [message, setMessage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5273/api/tarefas/listar/${id}`)
      .then(response => setTarefa(response.data))
      .catch(error => console.error('Erro ao buscar tarefa:', error));

    axios.get('http://localhost:5273/api/categoria/listar')
      .then(response => setCategorias(response.data))
      .catch(error => console.error('Erro ao buscar categorias:', error));
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setTarefa({ ...tarefa, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5273/api/tarefas/alterar/${id}`, tarefa);
      setMessage({ type: 'success', text: 'Tarefa alterada com sucesso!' });
      setTimeout(() => navigate('/tarefas'), 2000);
    } catch (error) {
      console.error('Erro ao alterar tarefa:', error);
      setMessage({ type: 'error', text: 'Erro ao alterar tarefa. Por favor, tente novamente.' });
    }
  };

  return (
    <div className="tarefa-alterar-container">
      <h2>Alterar Tarefa</h2>
      <form onSubmit={handleSubmit} className="tarefa-form">
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input type="text" id="titulo" name="titulo" value={tarefa.titulo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea id="descricao" name="descricao" value={tarefa.descricao} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="categoriaId">Categoria:</label>
          <select id="categoriaId" name="categoriaId" value={tarefa.categoriaId} onChange={handleChange} required>
            <option value="">Selecione uma categoria</option>
            {categorias.map(categoria => (
              <option key={categoria.categoriaId} value={categoria.categoriaId}>{categoria.nome}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" value={tarefa.status} onChange={handleChange} required>
            <option value="Não iniciada">Não iniciada</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluída">Concluída</option>
          </select>
        </div>
        <button type="submit" className="btn-alterar">Alterar</button>
      </form>
      {message && <div className={`message ${message.type}`}>{message.text}</div>}
    </div>
  );
}

export default TarefaAlterar;