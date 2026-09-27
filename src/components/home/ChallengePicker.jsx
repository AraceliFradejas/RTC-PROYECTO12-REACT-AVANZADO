import { useLanguage } from '../../context/LanguageContext';
const chapters = [
  { id: 'voices', number: 'I', title: 'Entre dos plumas', subtitle: '¿Taylor Swift o Shakespeare?', description: 'Reconoce la voz detrás de diez fragmentos. Dos universos que hablan de lo mismo.', tag: 'INTUICIÓN · 2 OPCIONES', mark: '❧' },
  { id: 'works', number: 'II', title: 'La obra oculta', subtitle: 'Una frase. Cuatro historias.', description: 'Identifica la canción o la obra entre cuatro títulos. El siguiente paso para quien ya reconoce la voz.', tag: 'MEMORIA · 4 OPCIONES', mark: '✦' },
  { id: 'eras', number: 'III', title: 'El hilo de las eras', subtitle: 'Cada álbum tiene su momento.', description: 'Reconstruye una cronología con seis álbumes. Mueve las piezas y encuentra el orden de su historia.', tag: 'CRONOLOGÍA · 6 PIEZAS', mark: '◷' },
];
export default function ChallengePicker({ value, onChange }) {
  const { t } = useLanguage();
  return <fieldset className="chapter-grid"><legend className="sr-only">{t('Elige un desafío')}</legend>
    {chapters.map(chapter => <label className={`chapter-card ${value === chapter.id ? 'is-selected' : ''}`} key={chapter.id}>
      <div className="chapter-top"><span className="eyebrow">{t('CAPÍTULO')} {chapter.number}</span><input type="radio" name="challenge" value={chapter.id} checked={value === chapter.id} onChange={() => onChange(chapter.id)}/></div>
      <span className="chapter-mark" aria-hidden="true">{chapter.mark}</span><h3>{t(chapter.title)}</h3><p className="chapter-subtitle">{t(chapter.subtitle)}</p><p className="chapter-description">{t(chapter.description)}</p><span className="chapter-tag">{t(chapter.tag)}</span>
    </label>)}
  </fieldset>;
}
