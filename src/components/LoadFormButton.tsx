import { useEffect, useState } from 'react';
import { Button, List, Modal } from 'antd';
import { useAppDispatch } from '../store/hooks';
import { loadForm } from '../store/slices/formSlice';
import { listFormTemplates } from '../db/formTemplateService';
import type { FormTemplate } from '../db/formDb';

function LoadFormButton() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [templates, setTemplates] = useState<FormTemplate[]>([]);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    listFormTemplates().then(setTemplates);
  }, [isModalOpen]);

  const handleLoad = (template: FormTemplate) => {
    dispatch(loadForm({ id: template.id, name: template.name, fields: template.fields }));
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Load Form</Button>

      <Modal
        title="Saved forms"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <List
          locale={{ emptyText: 'No saved forms yet.' }}
          dataSource={templates}
          renderItem={(template) => (
            <List.Item
              actions={[
                <Button key="load" type="link" onClick={() => handleLoad(template)}>
                  Load
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={template.name}
                description={`Updated ${new Date(template.updatedAt).toLocaleString()}`}
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
}

export default LoadFormButton;
