import { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadForm } from '../store/slices/formSlice';
import { createFormTemplate, updateFormTemplateFields } from '../db/formTemplateService';

function SaveFormButton() {
  const dispatch = useAppDispatch();
  const { id, name, fields } = useAppSelector((state) => state.form);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingName, setPendingName] = useState(name);

  const handleSaveClick = () => {
    if (id) {
      updateFormTemplateFields(id, fields);
      return;
    }

    setPendingName(name);
    setIsModalOpen(true);
  };

  const handleConfirmSave = async () => {
    const template = await createFormTemplate(pendingName.trim() || 'Untitled form', fields);
    dispatch(loadForm({ id: template.id, name: template.name, fields: template.fields }));
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={handleSaveClick}>
        Save Form
      </Button>

      <Modal
        title="Save form"
        open={isModalOpen}
        onOk={handleConfirmSave}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
      >
        <Input
          placeholder="Form name"
          value={pendingName}
          onChange={(e) => setPendingName(e.target.value)}
          onPressEnter={handleConfirmSave}
        />
      </Modal>
    </>
  );
}

export default SaveFormButton;
