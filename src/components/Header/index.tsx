import React, { ReactNode } from "react";
import { Container } from "./styles";

interface Props {
  children?: ReactNode
}

export function Header({ children }: Props) {
  return(
    <Container>{children}</Container>
  )
}