import { Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Layout from './components/Layout';
import EmptyState from './components/EmptyState';
import Home from './pages/Home';
import Game from './pages/Game';
import Results from './pages/Results';
import Instructions from './pages/Instructions';
import Archive from './pages/Archive';
import './styles/base.css';
import './styles/layout.css';
import './styles/reading.css';
export default function App() {
  return <GameProvider><Routes><Route element={<Layout/>}>
    <Route index element={<Home/>}/><Route path="instrucciones" element={<Instructions/>}/>
    <Route path="archivo" element={<Archive/>}/><Route path="partida" element={<Game/>}/>
    <Route path="resultados" element={<Results/>}/><Route path="*" element={<EmptyState title="Esta página se ha traspapelado." description="La dirección que buscas no forma parte del archivo."/>}/>
  </Route></Routes></GameProvider>;
}
