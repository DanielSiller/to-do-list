import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(100)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 30px;

  background-color: ${({ theme }) => theme.colors.primary};
`;
