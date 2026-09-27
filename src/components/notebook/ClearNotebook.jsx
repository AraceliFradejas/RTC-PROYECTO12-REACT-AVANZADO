import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNotebookActions } from '../../context/NotebookContext';

export default function ClearNotebook({ disabled }) {
  const { t } = useLanguage();
  const dispatch = useNotebookActions();
  const [confirmClear, setConfirmClear] = useState(false);

  function clearNotebook() {
    dispatch({ type: 'CLEAR' });
    setConfirmClear(false);
  }

  return (
    <div className="notebook-clear">
      {confirmClear ? <>
        <p>{t('Se borrarán los hallazgos, favoritos, sellos e historial. La partida actual se conserva.')}</p>
        <button className="button button-outline" onClick={clearNotebook}>
          {t('Sí, vaciar mi cuaderno')}
        </button>
        <button className="text-button" onClick={() => setConfirmClear(false)}>
          {t('Cancelar')}
        </button>
      </> : (
        <button className="text-button" disabled={disabled} onClick={() => setConfirmClear(true)}>
          {t('Vaciar mi cuaderno')}
        </button>
      )}
    </div>
  );
}
