import { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { App, Button, Empty, Flex, Input, Modal, Space, Tooltip, theme, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadForm, renameForm, setFormId } from '../store/slices/formSlice';
import {
  deleteFormTemplate,
  listFormTemplates,
  renameFormTemplate,
} from '../db/formTemplateService';
import { useTranslation } from '../i18n/localeContext';
import type { FormTemplate } from '../types/form';

const { Text } = Typography;
const { useToken } = theme;

function LoadFormButton() {
  const dispatch = useAppDispatch();
  const currentFormId = useAppSelector((state) => state.form.id);
  const { message } = App.useApp();
  const { token } = useToken();
  const { t } = useTranslation();
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
    message.success(t('load.success'));
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
      title: t('load.deleteTitle'),
      content: t('load.deleteContent', { name: template.name }),
      okText: t('load.deleteOk'),
      cancelText: t('common.cancel'),
      okButtonProps: { danger: true },
      onOk: async () => {
        await deleteFormTemplate(template.id);

        if (template.id === currentFormId) {
          dispatch(setFormId(null));
        }

        refreshTemplates();
        message.success(t('load.deleteSuccess'));
      },
    });
  };

  return (
    <>
      <Tooltip title={t('load.tooltip')}>
        <Button onClick={() => setIsModalOpen(true)}>{t('load.button')}</Button>
      </Tooltip>

      <Modal
        title={t('load.modalTitle')}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {templates.length === 0 ? (
          <Empty description={t('load.empty')} />
        ) : (
          <Space orientation="vertical" style={{ width: '100%' }} size={0}>
            {templates.map((template, index) => (
              <Flex
                key={template.id}
                justify="space-between"
                align="center"
                style={{
                  width: '100%',
                  padding: '8px 0',
                  borderBottom:
                    index < templates.length - 1 ? `1px solid ${token.colorSplit}` : undefined,
                }}
              >
                <div>
                  <Text strong>{template.name}</Text>
                  <br />
                  <Text type="secondary">
                    {t('load.updated', {
                      date: new Date(template.updatedAt).toLocaleString(),
                    })}
                  </Text>
                </div>

                <Space size={4}>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleRenameClick(template)}
                  />
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteClick(template)}
                  />
                  <Button type="link" onClick={() => handleLoad(template)}>
                    {t('load.loadLink')}
                  </Button>
                </Space>
              </Flex>
            ))}
          </Space>
        )}
      </Modal>

      <Modal
        title={t('load.renameTitle')}
        open={renamingTemplate !== null}
        onOk={handleConfirmRename}
        onCancel={() => setRenamingTemplate(null)}
        okText={t('load.renameOk')}
      >
        <Input
          placeholder={t('save.namePlaceholder')}
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onPressEnter={handleConfirmRename}
        />
      </Modal>
    </>
  );
}

export default LoadFormButton;
