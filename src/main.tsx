
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route , Routes } from "react-router-dom";
import './index.css'
import App from './Geral.tsx'
import Info from './informacoes.tsx';
import Sidebar from './components/SideBar/Side.tsx';
import Orders from './Orders.tsx'
import NotFound from './components/NotFound.tsx'; // Crie um componente NotFound

createRoot(document.getElementById('root')!).render(
  <Router>
    <div>
      <Sidebar /> 
      

<Routes>
  <Route path="/" element={<App />} />
  <Route path="/info" element={<Info />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="*" element={<NotFound />} /> {/* Adicione esta linha */}
</Routes>

    </div>
  </Router>
);