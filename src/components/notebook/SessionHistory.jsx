import { useLanguage } from '../../context/LanguageContext';

const chapterTitles = {
  eras: 'El hilo de las eras',
  works: 'La obra oculta',
  voices: 'Entre dos plumas',
};

export default function SessionHistory({ history }) {
  const { t } = useLanguage();
  return (
    <section className="session-history">
      <h2>{t('Mi recorrido')}</h2>
      <p className="small">{t('Últimas veinte partidas terminadas. Las nuevas lecturas no borran las anteriores.')}</p>
      {history.length ? (
        <ol>{history.map((item, index) => (
          <li key={item.id}>
            <span className="eyebrow">{String(history.length - index).padStart(2, '0')}</span>
            <strong>{t(chapterTitles[item.challenge] || chapterTitles.voices)}</strong>
            <span>{item.challenge === 'eras'
              ? t('Comprobaciones: {count}', { count: item.checks })
              : `${item.score} ${t('puntos')} · ${item.correct}/${item.total}`}
            </span>
          </li>
        ))}</ol>
      ) : <p>{t('Tu primera partida terminada aparecerá aquí.')}</p>}
    </section>
  );
}
