import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray_600};
`;

export const ListHeader = styled.View`
  width: 100%;
  flex-direction: row;

  padding: 14px;
  justify-content: space-between;
  padding-bottom: 8px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-weight: 600;
`;

export const ButtonIcon = styled(RectButton)``;

export const Icon = styled(Feather)``;

export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(52, 52, 52, 0.8);
`;

export const ModalContent = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  height: 50%;
  width: 80%;
  border-radius: 10px;
  justify-content: space-around;
  padding: 10px;
`;

export const ModalTitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  text-align: center;
  font-size: ${RFValue(20)}px;
`;

export const ModalDescription = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  text-align: center;
  font-size: ${RFValue(16)}px;
`;