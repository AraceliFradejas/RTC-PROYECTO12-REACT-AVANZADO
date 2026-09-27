import { useLanguage } from '../../context/LanguageContext';
export default function ModePicker({ mode, onChange }) {
  const { t } = useLanguage();
  return (
    <fieldset className="mode-options">
      <legend className="sr-only">{t('Modo de partida')}</legend>
      <label className={`mode-card ${mode === 'calm' ? 'selected' : ''}`}>
        <input
          type="radio"
          name="mode"
          value="calm"
          checked={mode === 'calm'}
          onChange={() => onChange('calm')}
        />
        <span className="mode-icon" aria-hidden="true">
          ✧
        </span>
        <span className="mode-text">
          <strong>{t('Sin prisa')}</strong>
          <span>{t('Lee, siente y decide. Sin reloj.')}</span>
        </span>
      </label>
      <label className={`mode-card ${mode === 'timed' ? 'selected' : ''}`}>
        <input
          type="radio"
          name="mode"
          value="timed"
          checked={mode === 'timed'}
          onChange={() => onChange('timed')}
        />
        <span className="mode-icon" aria-hidden="true">
          ◷
        </span>
        <span className="mode-text">
          <strong>{t('A contrarreloj')}</strong>
          <span>{t('Confía en tu intuición. 20 s por fragmento.')}</span>
        </span>
      </label>
    </fieldset>
  );
}
