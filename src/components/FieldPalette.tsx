import { Button, Space, Typography } from 'antd';
import { useAppDispatch } from '../store/hooks';
import { addField } from '../store/slices/formSlice';

const { Title } = Typography;

function FieldPalette() {
  const dispatch = useAppDispatch();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={4}>Field Palette</Title>

      <Button type="primary" block onClick={() => dispatch(addField('input'))}>
        Add Input
      </Button>
      <Button block onClick={() => dispatch(addField('select'))}>
        Add Select
      </Button>
      <Button block onClick={() => dispatch(addField('checkbox'))}>
        Add Checkbox
      </Button>
    </Space>
  );
}

export default FieldPalette;
