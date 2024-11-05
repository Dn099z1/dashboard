import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import GarageIcon from '@mui/icons-material/Garage';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import './Orders.css';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
function App() {

  const handleButtonClick = (url: string) => {
    if (url && typeof url === 'string') {
      window.open(url, '_blank');
    } else {
      console.error('Invalid URL:', url);
    }
  };
  

  return (
    <>
      <header className="header">
        <a href="/" target="" className="ageral">
          <h3>Geral</h3>
        </a>
        <a href="/rules" target="" className="aloja">
          <h3>REGRAS</h3>
        </a>
        <a href="/orders" target="" className="acompras">
          <h3>Loja</h3>
        </a>
        <a href="/info" target="" className="ainfo">
          <h3>Informações</h3>
        </a>
      </header>

      <div className="container2">
        <h2>CATEGORIAS</h2>
        <div className="vip">premium</div>
        <div className="quadradovip">
        <WorkspacePremiumIcon sx={{ fontSize: 100, color: 'cyan', marginBottom: 0 }} />
          <Button
            variant="contained"
            color="success"
            endIcon={<VisibilityIcon />}
            onClick={() => handleButtonClick('https://link-vip.com')}
          >
            ver
          </Button>
        </div>
        <div className="carro">veiculos</div>
        <div className="quadradocarro">
        <GarageIcon sx={{ fontSize: 100, color: 'cyan', marginBottom: 0 }} />
          
          <Button
            variant="contained"
            color="success"
            endIcon={<VisibilityIcon />}
            onClick={() => handleButtonClick('https://link-carros.com')}
          >
            ver
          </Button>
        </div>
        <div className="armored">armored</div>
        <div className="quadradoarmored">
        <DirectionsBusFilledIcon sx={{ fontSize: 100, color: 'cyan', marginBottom: 0 }} />
          <Button
            variant="contained"
            color="success"
            endIcon={<VisibilityIcon />}
            onClick={() => handleButtonClick('https://link-armored.com')}
          >
            ver
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
