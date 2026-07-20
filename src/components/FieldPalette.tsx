import { Button, Card, Space } from 'antd';
import { useAppDispatch } from '../store/hooks';
import { addField } from '../store/slices/formSlice';
import { useTranslation } from '../i18n/localeContext';
import { fieldTypeLabelKeys } from '../i18n/fieldTypes';
import type { FieldType } from '../types/form';

const paletteItems: FieldType[] = ['input', 'textarea', 'select', 'checkbox', 'date', 'number'];

function FieldPalette() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <Card title={t('palette.title')}>
      <Space orientation="vertical" style={{ width: '100%' }}>
        {paletteItems.map((type) => (
          <Button key={type} block onClick={() => dispatch(addField(type))}>
            {t(fieldTypeLabelKeys[type])}
          </Button>
        ))}
      </Space>
    </Card>
  );
}

export default FieldPalette;
