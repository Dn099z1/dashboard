import { useEffect, useState } from 'react';
import axios from 'axios';

import './informacoes.css';

function getDiscordId() {
  let discordId = localStorage.getItem('discord_id');
  return discordId ? discordId : null;
}

interface Character {
  license: string;
  whitelistStatus: string;
  premiumStatus: string;
}

function Info() {
  const [characterInfo, setCharacterInfo] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const discordId = getDiscordId();
    if (discordId) {
      axios
        .get(`http://26.25.111.226:5000/api/characters/${discordId}`)
        .then((response) => {
          setCharacterInfo(response.data.characters); // Salva todos os personagens
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching character data:', err);
          setError('Failed to load character information.');
          setLoading(false);
        });
    } else {
      setLoading(false); // se não existir, para o carregamento
    }
  }, []);

  return (
    <>
      <header className="header">
        <a href="/" className="ageral"><h3>Geral</h3></a>
        <a href="/rules" className="aloja"><h3>Regras</h3></a>
        <a href="/orders" className="acompras"><h3>Loja</h3></a>
        <a href="/info" className="ainfo"><h3>Informações</h3></a>
      </header>

      <div className="container">
        <h1 className="personagens">credenciais:</h1>
        <h2 className="clique">Suas credenciais. Sigilo!</h2>

        {loading ? (
          <h3>Loading character information...</h3>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          characterInfo.length > 0 ? (
            characterInfo.map((character, index) => (
              <div className="infopersonagem" key={index}>
                <h1>Sua Conta</h1>
                <div className="telefone">
                  <h2>WHITELIST:</h2>
                  <h3>{character.whitelistStatus}</h3>
                </div>
                <div className="Banco">
                  <h2>PREMIUM:</h2>
                  <h3>{character.premiumStatus}</h3>
                </div>
                <div className="idpersonagem">
                  <h2>Licença:</h2>
                  <h3>{character.license}</h3>
                  <button
  className="slotdesbloqueio"
  onClick={() => window.open("https://newvalleygg.centralcart.com.br/", "_blank")}
>
  <h1>COMO ADQUIRO PREMIUM?</h1>
</button>

                </div>
                
              </div>
            ))
          ) : (
            <h3>No characters found for this user.</h3>
          )
        )}
      </div>
    </>
  );
}

export default Info;
