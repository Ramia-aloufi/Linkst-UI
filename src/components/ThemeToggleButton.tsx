// Inside any component
import { useThemeContext } from '../context/ThemeContext';
import { Button } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
export const ThemeToggleButton = () => {
  const { toggleTheme, mode } = useThemeContext();

  return (
    <Button onClick={toggleTheme}>
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </Button>
  );
};
