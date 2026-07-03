import { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Input, List, message, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadForm, renameForm, setFormId } from '../store/slices/formSlice';
import { deleteFormTemplate, listFormTemplates, renameFormTemplate } from '../db/formTemplateService';
import type { FormTemplate } from '../db/formDb';

function LoadFormButton() {
  const dispatch = useAppDispatch();
  const currentFormId = useAppSelector((state) => state.form.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  const [renamingTemplate, setRenamingTemplate] = useState<FormTemplate | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const refreshTemplates = () => {
    listFormTemplates().then(setTemplates);
  };

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    refreshTemplates();
  }, [isModalOpen]);

  const handleLoad = (template: FormTemplate) => {
    dispatch(loadForm({ id: template.id, name: template.name, fields: template.fields }));
    setIsModalOpen(false);
    message.success('Form loaded successfully.');
  };

  const handleRenameClick = (template: FormTemplate) => {
    setRenamingTemplate(template);
    setRenameValue(template.name);
  };

  const handleConfirmRename = async () => {
    if (!renamingTemplate) {
      return;
    }

    const name = renameValue.trim() || renamingTemplate.name;
    await renameFormTemplate(renamingTemplate.id, name);

    if (renamingTemplate.id === currentFormId) {
      dispatch(renameForm(name));
    }

    setRenamingTemplate(null);
    refreshTemplates();
  };

  const handleDeleteClick = (template: FormTemplate) => {
    Modal.confirm({
      title: 'Delete form',
      content: `Delete "${template.name}"? This can't be undone.`,
      okText: 'Delete',
      okButtonProps: { danger: true },
      onOk: async () => {
        await deleteFormTemplate(template.id);

        if (template.id === currentFormId) {
          dispatch(setFormId(null));
        }

        refreshTemplates();
        message.success('Form deleted successfully.');
      },
    });
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
                <Button
                  key="rename"
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleRenameClick(template)}
                />,
                <Button
                  key="delete"
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteClick(template)}
                />,
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

      <Modal
        title="Rename form"
        open={renamingTemplate !== null}
        onOk={handleConfirmRename}
        onCancel={() => setRenamingTemplate(null)}
        okText="Rename"
      >
        <Input
          placeholder="Form name"
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onPressEnter={handleConfirmRename}
        />
      </Modal>
    </>
  );
}

export default LoadFormButton;
