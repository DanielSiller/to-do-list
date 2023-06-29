import React from "react";
import { Container, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, disabled, ...rest }: Props) {
  return (
    <Container {...rest} disabled={disabled}>
      <Title disabled={disabled}>{title}</Title>
    </Container>
  )
}