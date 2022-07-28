import './App.css';

import Routes from './routes/routes.js'
import { useParams } from 'react-router-dom'


function App() {
  const { id } = useParams();
  return (
    <Routes id={id ? Number(id) : null} />
  );
}

export default App;
