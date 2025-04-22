import React, { useEffect, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { selectTheme } from '../slices/themeSlice';
import { useSelector} from 'react-redux';


export default ({ children }) => {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);

  const muiTheme = useMemo(() => 
    createTheme({
      palette: {
        mode: theme === 'dark' ? 'dark' : 'light',
      },
    }), [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      {children}
    </ThemeProvider>
  );
};