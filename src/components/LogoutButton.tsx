import { LogoutOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { clearStoredUsername } from '../utils/authStorage';

function LogoutButton() {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    clearStoredUsername();
    dispatch(logout());
  };

  return (
    <Tooltip title="Log out">
      <Button type="text" icon={<LogoutOutlined />} onClick={handleClick} />
    </Tooltip>
  );
}

export default LogoutButton;
