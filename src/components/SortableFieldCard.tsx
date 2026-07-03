import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import FieldSettingsCard from './FieldSettingsCard';
import type { Field } from '../store/slices/formSlice';

interface SortableFieldCardProps {
  field: Field;
}

function SortableFieldCard({ field }: SortableFieldCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: field.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <FieldSettingsCard
        field={field}
        dragHandleAttributes={attributes}
        dragHandleListeners={listeners}
      />
    </div>
  );
}

export default SortableFieldCard;
