


import './Geral.css'

function App() {

  return (
<>
      <header className="header">
        <a href="/" target="" className="ageral">
        <h3>Geral</h3>
        </a>
          <a href="/rules" target="" className="aloja">
          <h3>Regras</h3>
          </a>
          <a href="/orders" target="" className="acompras">
          <h3>Loja</h3>
          </a>
          <a href="/info" target="" className="ainfo">
          <h3>Informações</h3>
          </a>
      </header>



      <div className="container">
      <iframe
        src="https://newvalley.online/"
        width="100%"
        height="100%"
        style={{ borderRadius: '19px', border: 'none' }}
        title="Site Integrado"
      ></iframe>
    </div>
</>
  )
}

export default App
