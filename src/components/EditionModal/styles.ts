import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons'
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.Modal``;

export const Icon = styled(Feather)``;

export const CenteredView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const ModalView = styled.View`
 width: 80%;
 height: 50%;
 background-color: ${({ theme }) => theme.colors.background_dark};
 border-radius: 10px;
 padding: 20px;
 justify-content: space-between;
`;

export const Input = styled.TextInput`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.text};
  border-radius: 15px;
  margin-top: 10px;
`;

export const ModalHeader = styled.View`
  align-items: flex-end;
`;

export const ModalContent = styled.View`
  
`;

export const ButtonIcon = styled(RectButton)``;


export const SubTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: 600;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 20px;
  align-items: center;
  border-radius: 10px;
`;