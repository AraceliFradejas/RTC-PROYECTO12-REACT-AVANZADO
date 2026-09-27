import { useNotebook, useNotebookActions } from '../../context/NotebookContext';
import { useLanguage } from '../../context/LanguageContext';
export default function SaveButton({ id }) {
  const { saved } = useNotebook();
  const dispatch = useNotebookActions();
  const { t } = useLanguage();
  const active = saved.includes(id);
  return (
    <button
      className="save-button"
      aria-pressed={active}
      onClick={() => dispatch({ type: 'SAVE', id })}
    >
      <span aria-hidden="true">{active ? '◆' : '◇'}</span>{' '}
      {t(active ? 'Guardado en mi cuaderno' : 'Guardar en mi cuaderno')}
    </button>
  );
}
