import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#2563EB' },
    secondary: { main: '#1E293B' },
    background: { default: '#F8FAFC', paper: '#FFFFFF' },
    text: { primary: '#0F172A', secondary: '#64748B' },
    success: { main: '#22C55E' },
    warning: { main: '#F59E0B' },
    error: { main: '#EF4444' },
    divider: '#E2E8F0',
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontWeight: 800, lineHeight: 1.05, fontSize: '3rem' },
    h2: { fontWeight: 700, lineHeight: 1.1, fontSize: '2.25rem' },
    h3: { fontWeight: 700, lineHeight: 1.2, fontSize: '1.75rem' },
    h4: { fontWeight: 700, lineHeight: 1.2, fontSize: '1.4rem' },
    h5: { fontWeight: 600, lineHeight: 1.2, fontSize: '1.15rem' },
    body1: { fontWeight: 400, fontSize: '1rem', color: '#475569' },
    body2: { fontWeight: 400, fontSize: '0.95rem', color: '#64748B' },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: { borderRadius: 16 },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F8FAFC',
          color: '#0F172A',
          transition: 'background-color 250ms ease',
        },
        '*': {
          boxSizing: 'border-box',
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: 'none',
          transition: 'transform 250ms ease, box-shadow 250ms ease, background-color 250ms ease',
          '&:hover': { boxShadow: 'none', transform: 'translateY(-1px)' },
          '&:active': { transform: 'translateY(0)' },
        },
        containedPrimary: {
          boxShadow: '0 10px 30px rgba(37, 99, 235, 0.18)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: 'border-color 250ms ease, box-shadow 250ms ease',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2563EB',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 2,
            borderColor: '#2563EB',
            boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.12)',
          },
        },
      },
    },
  },
});

export default theme;