import { type PropsWithChildren, type ReactNode, memo } from "react";
import { Button as MuiButton, type SxProps, type Theme} from "@mui/material"

type Props = {
   type?: "submit" | "reset" | "button"
   onClick: () => void
   disabled?: boolean
   dataCy?: string
   startIcon?: ReactNode
   endIcon?: ReactNode
   color?:
   | "inherit"
   | "primary"
   | "secondary"
   | "success"
   | "error"
   | "info"
   | "warning"
   size?: 'small' | 'medium' | 'large'
   fullWidth?: boolean
   sx?: SxProps<Theme>
}

export const PrimaryButton = memo(({
   disabled,
   type,
   startIcon,
   onClick,
   color,
   children,
   fullWidth = false,
   endIcon,
   dataCy,
   size = 'medium',
   sx
}: PropsWithChildren<Props>) => {
   return (
      <MuiButton
         data-cy={dataCy}
         sx={sx}
         fullWidth={fullWidth}
         type={type}
         variant={'contained'}
         disabled={disabled}
         startIcon={startIcon}
         size={size}
         endIcon={endIcon}
         color={color}
         onClick={() => onClick && onClick()}
      >
         {children}
      </MuiButton>
   )
})