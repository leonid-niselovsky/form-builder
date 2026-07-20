import { useState } from 'react';
import { App, Button, Input, Modal, Space, Tooltip, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadForm } from '../store/slices/formSlice';
import { createFormTemplate, updateFormTemplateFields } from '../db/formTemplateService';
import { useTranslation } from '../i18n/localeContext';

function SaveFormButton() {
  const dispatch = useAppDispatch();
  const { id, name, fields } = useAppSelector((state) => state.form);
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingName, setPendingName] = useState(name);

  const handleSaveClick = async () => {
    if (id) {
      await updateFormTemplateFields(id, fields);
      message.success(t('save.success'));
      return;
    }

    setPendingName(name);
    setIsModalOpen(true);
  };

  const handleConfirmSave = async () => {
    const template = await createFormTemplate(pendingName.trim() || 'Untitled form', fields);
    dispatch(loadForm({ id: template.id, name: template.name, fields: template.fields }));
    setIsModalOpen(false);
    message.success(t('save.success'));
  };

  return (
    <>
      <Tooltip title={t('save.tooltip')}>
        <Button type="primary" className="btn-save" onClick={handleSaveClick}>
          {t('save.button')}
        </Button>
      </Tooltip>

      <Modal
        title={t('save.modalTitle')}
        open={isModalOpen}
        onOk={handleConfirmSave}
        onCancel={() => setIsModalOpen(false)}
        okText={t('save.ok')}
        cancelText={t('common.cancel')}
      >
        <Space orientation="vertical" size={4} style={{ width: '100%' }}>
          <Typography.Text id="save-form-name-label">{t('save.nameLabel')}</Typography.Text>
          <Input
            aria-labelledby="save-form-name-label"
            placeholder={t('save.namePlaceholder')}
            value={pendingName}
            onChange={(e) => setPendingName(e.target.value)}
            onPressEnter={handleConfirmSave}
            autoFocus
          />
        </Space>
      </Modal>
    </>
  );
}

export default SaveFormButton;
