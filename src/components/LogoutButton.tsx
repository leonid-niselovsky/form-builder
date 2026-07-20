import { LogoutOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { clearStoredUsername } from '../utils/authStorage';
import { useTranslation } from '../i18n/localeContext';

function LogoutButton() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
    clearStoredUsername();
    dispatch(logout());
  };

  return (
    <Tooltip title={t('logout.tooltip')}>
      <Button type="text" icon={<LogoutOutlined />} onClick={handleClick} />
    </Tooltip>
  );
}

export default LogoutButton;
