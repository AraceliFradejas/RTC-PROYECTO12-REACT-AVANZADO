import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useLanguage } from '../../context/LanguageContext';
import EraCard, { EraContent } from './EraCard';

export default function EraList({ albums, complete, dispatch }) {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const activeIndex = albums.findIndex((album) => album.id === activeId);
  const activeAlbum = albums[activeIndex];
  const title = (id) => albums.find((album) => album.id === id)?.title || '';
  const position = (id) => albums.findIndex((album) => album.id === id) + 1;
  const announcements = {
    onDragStart: ({ active }) => t('Has cogido {album}.', { album: title(active.id) }),
    onDragOver: ({ active, over }) =>
      over
        ? t('{album}, posición {position} de 6.', {
            album: title(active.id),
            position: position(over.id),
          })
        : undefined,
    onDragEnd: ({ active, over }) =>
      over ? t('{album} colocado.', { album: title(active.id) }) : t('Movimiento cancelado.'),
    onDragCancel: () => t('Movimiento cancelado.'),
  };
  function finish({ active, over }) {
    setActiveId(null);
    if (over) dispatch({ type: 'REORDER', id: active.id, overId: over.id });
  }
  return (
    <>
      {!complete && (
        <p className="era-instructions">
          {t('Arrastra desde ⠿ para colocar cada álbum. También puedes usar las flechas.')}
        </p>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={({ active }) => setActiveId(active.id)}
        onDragEnd={finish}
        onDragCancel={() => setActiveId(null)}
        accessibility={{
          announcements,
          screenReaderInstructions: {
            draggable: t(
              'Pulsa espacio para coger la tarjeta, usa las flechas para moverla y vuelve a pulsar espacio para soltarla. Escape cancela.',
            ),
          },
        }}
      >
        <SortableContext items={albums} strategy={verticalListSortingStrategy}>
          <ol className="era-list">
            {albums.map((album, index) => (
              <EraCard
                key={album.id}
                album={album}
                index={index}
                count={albums.length}
                complete={complete}
                dispatch={dispatch}
              />
            ))}
          </ol>
        </SortableContext>
        <DragOverlay dropAnimation={null}>
          {activeAlbum && (
            <div
              className="era-card era-overlay"
              style={{ '--era-colour': activeAlbum.colour }}
              aria-hidden="true"
            >
              <EraContent album={activeAlbum} index={activeIndex} />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </>
  );
}
