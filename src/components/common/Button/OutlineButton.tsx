import { Button as MuiButton, type SxProps, type Theme } from '@mui/material'
import { memo, type PropsWithChildren, type ReactNode, useCallback} from 'react'


type Props = {
   onClick?: (e: React.MouseEvent<HTMLElement>) => void
   disabled?: boolean
   fullWidth?: boolean
   id?: string
   dataCy?: string
   startIcon?: ReactNode
   sx?: SxProps<Theme>
   color?:
   | "inherit"
   | "primary"
   | "secondary"
   | "success"
   | "error"
   | "info"
   | "warning"
}

export const OutlineButton = memo(({
   onClick,
   children,
   startIcon,
   fullWidth,
   color,
   id,
   disabled,
   dataCy,
   sx
}: PropsWithChildren<Props>) => {
   const onClickButton = useCallback((e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      e.stopPropagation()

      onClick?.(e)
   }, [onClick])

   return (
      <MuiButton
         id={id}
         sx={sx}
         fullWidth={fullWidth}
         disabled={disabled}
         color={color}
         data-cy={dataCy}
         variant={'outlined'}
         startIcon={startIcon}
         onClick={onClickButton}
      >
         {children}
      </MuiButton>
   )
})