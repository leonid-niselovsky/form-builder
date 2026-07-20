import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, Empty, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { reorderFields } from '../store/slices/formSlice';
import { useTranslation } from '../i18n/localeContext';
import SortableFieldCard from './SortableFieldCard';

function FormBuilder() {
  const dispatch = useAppDispatch();
  const fields = useAppSelector((state) => state.form.fields);
  const sensors = useSensors(useSensor(PointerSensor));
  const { t } = useTranslation();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      dispatch(reorderFields({ activeId: String(active.id), overId: String(over.id) }));
    }
  };

  return (
    <Card title={t('builder.title')}>
      {fields.length === 0 ? (
        <Empty description={t('builder.empty')} />
      ) : (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext
            items={fields.map((field) => field.id)}
            strategy={verticalListSortingStrategy}
          >
            <Space orientation="vertical" style={{ width: '100%' }} size="middle">
              {fields.map((field) => (
                <SortableFieldCard key={field.id} field={field} />
              ))}
            </Space>
          </SortableContext>
        </DndContext>
      )}
    </Card>
  );
}

export default FormBuilder;
