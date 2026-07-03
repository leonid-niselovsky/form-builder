import { Button, Modal } from 'antd';
import { useAppDispatch } from '../store/hooks';
import { loadForm } from '../store/slices/formSlice';

function ResetFormButton() {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    Modal.confirm({
      title: 'Reset form',
      content: "Clear all fields in the current form? This can't be undone.",
      okText: 'Reset',
      okButtonProps: { danger: true },
      onOk: () => {
        dispatch(loadForm({ id: null, name: 'Untitled form', fields: [] }));
      },
    });
  };

  return (
    <Button danger onClick={handleClick}>
      Reset Form
    </Button>
  );
}

export default ResetFormButton;
