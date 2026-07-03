import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Empty, Space, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { reorderFields } from '../store/slices/formSlice';
import SortableFieldCard from './SortableFieldCard';

const { Title } = Typography;

function FormBuilder() {
  const dispatch = useAppDispatch();
  const fields = useAppSelector((state) => state.form.fields);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      dispatch(reorderFields({ activeId: String(active.id), overId: String(over.id) }));
    }
  };

  return (
    <section>
      <Title level={3}>Form Builder</Title>

      {fields.length === 0 ? (
        <Empty description="No fields yet. Add your first field from the palette." />
      ) : (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext items={fields.map((field) => field.id)} strategy={verticalListSortingStrategy}>
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              {fields.map((field) => (
                <SortableFieldCard key={field.id} field={field} />
              ))}
            </Space>
          </SortableContext>
        </DndContext>
      )}
    </section>
  );
}

export default FormBuilder;
