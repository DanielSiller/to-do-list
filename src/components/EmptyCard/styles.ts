import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: ${RFPercentage(20)}px;
`;

export const Icon = styled(Feather)``;

export const Title = styled.Text`
  font-weight: 600;
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.gray_300};
  margin-top: 16px;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.gray_300};
`;