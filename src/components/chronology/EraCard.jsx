import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useLanguage } from '../../context/LanguageContext';

export function EraContent({ album, index, complete, children }) {
  const { t } = useLanguage();
  return <>
    <span className="era-number">{String(index + 1).padStart(2, '0')}</span>
    <div className="era-disc" aria-hidden="true"><span/></div>
    <div className="era-title">
      <h2>{album.title}</h2>
      <span>{complete ? album.year : t('EDICIÓN ORIGINAL')}</span>
    </div>
    {children}
  </>;
}

export default function EraCard({ album, index, count, complete, dispatch }) {
  const { t } = useLanguage();
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id: album.id, disabled: complete });
  return (
    <li ref={setNodeRef} className={`era-card${isDragging ? ' is-dragging' : ''}`}
      style={{ '--era-colour': album.colour, transform: CSS.Transform.toString(transform), transition }}>
      <EraContent album={album} index={index} complete={complete}>
        {complete ? <span className="era-check" aria-label={t('Orden correcto')}>✓</span> : <>
          <button ref={setActivatorNodeRef} className="era-drag" {...attributes} {...listeners}
            aria-roledescription={t('Tarjeta ordenable')}
            aria-label={t('Arrastrar {album}', { album: album.title })}>
            <span aria-hidden="true">⠿</span>
          </button>
          <div className="era-controls">
            <button aria-label={t('Subir {album}', { album: album.title })} disabled={index === 0}
              onClick={() => dispatch({ type: 'MOVE', id: album.id, direction: -1 })}>↑</button>
            <button aria-label={t('Bajar {album}', { album: album.title })} disabled={index === count - 1}
              onClick={() => dispatch({ type: 'MOVE', id: album.id, direction: 1 })}>↓</button>
          </div>
        </>}
      </EraContent>
    </li>
  );
}
