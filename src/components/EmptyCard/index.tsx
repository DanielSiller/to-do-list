import React from "react";
import { useTheme } from "styled-components";

import {
  Container,
  Description,
  Icon,
  Title
} from "./styles";


interface Props {
  title: string;
  description: string
}

export function EmptyCard({ title, description }: Props) {
  const theme = useTheme()
  return (
    <Container>
      <Icon name="clipboard" size={50} color={theme.colors.gray_300}/>
      <Title>
        {title}
      </Title>
      <Description>
        {description}
      </Description>
    </Container>
  )
}