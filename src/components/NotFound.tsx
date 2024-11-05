import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Página Não Encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <a href="/" style={{ textDecoration: 'none', color: '#007bff' }}>
        Voltar para a página inicial
      </a>
    </div>
  );
};

export default NotFound;