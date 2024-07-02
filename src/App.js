import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';




function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});
  const [erroMsg, setErroMsg] = useState("");

  async function handleSearch() {
    if (input === '') {
      setErroMsg("Digite algum CEP!");
      setInput("")
      setCep("")
      return;
    }
    try {
      setErroMsg("")
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");

    }
    catch {
      setCep("")
      setErroMsg("Nenhum CEP foi encontrado!")
      setInput(""); 
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscar CEP</h1>
      <div className="containerInput">
        <input type="text" placeholder="Digite o CEP" value={input}
          onChange={(e) => setInput(e.target.value)} />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {erroMsg && <p className="erroMsg">{erroMsg}</p>}

      {Object.keys(cep).length > 0 && (
        <main>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Bairro {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
