import { useLanguage } from '../context/LanguageContext';
import '../styles/work-links.css';

export default function WorkLinks({ question }) {
  const { t } = useLanguage();
  const resources = question.author === 'taylor'
    ? [[t('Vídeo con letra'), question.source], ['Apple Music', question.appleMusicUrl], ['Spotify', question.spotifyUrl]]
    : [[t('Leer el pasaje'), question.source]];
  return <div className="work-links">{resources.map(([resource, href]) =>
    <a key={resource} href={href} target="_blank" rel="noopener noreferrer"
      aria-label={t('{resource}: {work} (se abre en otra pestaña)', { resource, work: question.work })}>
      {resource} <span aria-hidden="true">↗</span>
    </a>)}</div>;
}
