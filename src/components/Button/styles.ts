import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface Props {
  disabled: boolean;
}

export const Container = styled.TouchableOpacity<Props>`
  width: 100%;
  background-color: ${({ theme, disabled }) => disabled ? theme.colors.secondary_ligth : theme.colors.secondary};
  padding: 20px;
  align-items: center;
  border-radius: 10px;
`;

export const Title = styled.Text<Props>`
  font-size: ${RFValue(16)}px;
  color: ${({ theme, disabled }) => disabled ? theme.colors.shape_ligth : theme.colors.shape};
  font-weight: 600;
`;