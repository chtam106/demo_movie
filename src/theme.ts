import { createTheme } from '@mui/material/styles'

const focusOutline = {
  outline: '2px solid rgba(255, 255, 255, 0.7)',
  outlineOffset: 2,
  boxShadow: 'none',
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e50914',
    },
    secondary: {
      main: '#564d4d',
    },
    background: {
      default: '#141414',
      paper: '#1f1f1f',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
          },
          '&.Mui-focusVisible': {
            ...focusOutline,
            backgroundColor: 'transparent',
          },
          '&:active': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 4,
          '&:hover, &:active, &.Mui-focusVisible': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover, &:active, &.Mui-focusVisible': {
            boxShadow: 'none',
          },
          '&.MuiButton-text:hover, &.MuiButton-text:active, &.MuiButton-text.Mui-focusVisible, &.MuiButton-textInherit:hover, &.MuiButton-textInherit:active, &.MuiButton-textInherit.Mui-focusVisible':
            {
              backgroundColor: 'transparent',
            },
        },
        text: {
          '&:hover, &:active, &.Mui-focusVisible': {
            backgroundColor: 'transparent',
          },
        },
        outlined: {
          '&:hover, &:active, &.Mui-focusVisible': {
            backgroundColor: 'transparent',
          },
        },
        contained: ({ theme: muiTheme }) => ({
          '&:hover, &:active, &.Mui-focusVisible': {
            backgroundColor: muiTheme.palette.primary.main,
            backgroundImage: 'none',
            boxShadow: 'none',
          },
          '&.MuiButton-containedSecondary:hover, &.MuiButton-containedSecondary:active, &.MuiButton-containedSecondary.Mui-focusVisible':
            {
              backgroundColor: muiTheme.palette.secondary.main,
            },
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover, &:active, &.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: 'transparent',
          },
          '&.Mui-focusVisible': {
            ...focusOutline,
            outlineOffset: -2,
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover, &:active, &.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: 'transparent',
          },
          '&.Mui-focusVisible': {
            ...focusOutline,
            outlineOffset: -2,
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&:hover, &:active, &.Mui-focusVisible': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&:hover, &:active, &.Mui-focusVisible': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&:hover, &:active, &.Mui-focusVisible': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
})
