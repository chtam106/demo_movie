import type { SxProps, Theme } from '@mui/material'

export const getSquareFocusSx = (outlineColor: string): SxProps<Theme> => ({
  borderRadius: 1,
  '&:focus': {
    outline: 'none',
  },
  '&.Mui-focusVisible': {
    outline: '2px solid',
    outlineColor: outlineColor,
    outlineOffset: 2,
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
})
