import { useLanguage } from '../../context/LanguageContext';
export default function ReadingStamps({ discovered, saved, history }) {
  const { t } = useLanguage();
  const stamps = [
    ['Primera huella', 'Descubre una obra.', discovered.length > 0, 'I'],
    ['Coleccionista', 'Guarda tres obras.', saved.length >= 3, 'II'],
    [
      'Lectora experta',
      'Completa La obra oculta.',
      history.some((item) => item.challenge === 'works'),
      'III',
    ],
    [
      'Archivista',
      'Ordena las seis eras.',
      history.some((item) => item.challenge === 'eras'),
      'IV',
    ],
  ];
  return (
    <div className="reading-stamps">
      {stamps.map(([name, description, earned, number]) => (
        <div key={name} className={`reading-stamp ${earned ? 'earned' : ''}`}>
          <span className="stamp-circle" aria-hidden="true">
            {earned ? '✧' : number}
          </span>
          <h3>{t(name)}</h3>
          <p>{t(description)}</p>
          <small>{t(earned ? 'Conseguido' : 'Por descubrir')}</small>
        </div>
      ))}
    </div>
  );
}
