import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { englishPaths } from './i18n/routes';
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
  const routes = [['/', <Home/>], ['/instrucciones', <Instructions/>], ['/archivo', <Archive/>], ['/partida', <Game/>], ['/resultados', <Results/>]];
  return <LanguageProvider><GameProvider><Routes><Route element={<Layout/>}>
    {routes.flatMap(([path, element]) => [path, englishPaths[path]].map(url => <Route key={url} path={url} element={element}/>))}
    <Route path="*" element={<EmptyState title="Esta página se ha traspapelado." description="La dirección que buscas no forma parte del archivo."/>}/>
  </Route></Routes></GameProvider></LanguageProvider>;
}
