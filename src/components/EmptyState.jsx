import { Link } from 'react-router-dom';
export default function EmptyState({ title, description = 'Elige un modo para abrir el archivo. Los resultados se conservan solo mientras esta página siga abierta.' }) {
  return <section className="empty-state"><span className="eyebrow">EL ARCHIVO DE POETAS</span><h1 tabIndex={-1}>{title}</h1><p>{description}</p><Link to="/" className="button">Volver al inicio →</Link></section>;
}
