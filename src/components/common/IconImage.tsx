import { type FC } from "react";
import styled from "@emotion/styled";

type Props = {
   path: string
   size?: number
   color?: string
}

const IconStyle = styled("img")((props: {
   size: number
   color: string
}) => ({
   height: props.size,
   width: props.size,
   color: props.color,
   fill: props.color
}))

export const IconImage: FC<Props> = ({ path, size, color}) => {
   return <IconStyle src={path} size={size ?? 18} color={color ?? ""} />
}