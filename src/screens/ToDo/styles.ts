import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray_600};
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.blue};
  font-weight: bold;
  `;

export const ListHeader = styled.View`
  width: 100%;
  flex-direction: row;

  padding: 14px;
  margin-top: 20px;
  justify-content: space-between;

`;

export const CreateContainer = styled.View`
  position: absolute;
  width: 100%;
  margin-top: ${RFPercentage(10)}px;
  padding: 0 20px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Input = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 15px;
  border-radius: 10px;
  width: 80%;
  color: ${({ theme }) => theme.colors.title};
`;

export const ButtonIcon = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.secondary};
  width: 19%;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather)``;

export const HeaderEdit = styled.View`
  padding: 0 20px;
  margin: 10px 0;
  
  flex-direction: row;
  justify-content: space-between;
`;