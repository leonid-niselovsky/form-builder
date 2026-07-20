import { Button, Modal, Tooltip } from 'antd';
import { useAppDispatch } from '../store/hooks';
import { loadForm } from '../store/slices/formSlice';
import { useTranslation } from '../i18n/localeContext';

function ResetFormButton() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
    Modal.confirm({
      title: t('reset.title'),
      content: t('reset.content'),
      okText: t('reset.ok'),
      cancelText: t('common.cancel'),
      okButtonProps: { danger: true },
      onOk: () => {
        dispatch(loadForm({ id: null, name: 'Untitled form', fields: [] }));
      },
    });
  };

  return (
    <Tooltip title={t('reset.tooltip')}>
      <Button className="btn-reset" onClick={handleClick}>
        {t('reset.button')}
      </Button>
    </Tooltip>
  );
}

export default ResetFormButton;
