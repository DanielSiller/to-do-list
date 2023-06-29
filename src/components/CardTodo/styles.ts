import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface OptionsProps {
    type: 'list' | 'task'
}

export const Container = styled.TouchableOpacity`
    height: 80px;

    background-color: ${({ theme }) => theme.colors.gray_500};
    padding: 12px;
    margin: 6px 14px;
    border-radius: 8px;

    flex-direction: row;
    align-items: center;
`;

export const Icon = styled.View`
    background-color: ${({ theme }) => theme.colors.secondary};
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;  
    margin-right: 12px;
`;

export const Name = styled.Text`
    flex: 1;
    color: ${({ theme }) => theme.colors.shape};
    font-size: 16px;
`;

export const Options = styled.View<OptionsProps>`
    height: 80px;
    justify-content: space-between;
    padding: 12px 0;
    flex-direction: ${({ type }) => type === 'list' ? 'row' : 'column'};
    align-items: center;
    width: ${({ type }) => type === 'list' ? '75px' : 'auto'};
`;

export const Option = styled.TouchableOpacity``;


export const ModalContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: rgba(52, 52, 52, 0.8);
`;

export const ModalContent = styled.View`
    background-color: ${({ theme }) => theme.colors.gray_600};
    height: 80%;
    width: 90%;
    border-radius: 10px;
    justify-content: space-around;
    padding: 10px;
`;

export const ModalHeader = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const Title = styled.Text`
    font-size: ${RFValue(20)}px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.blue};
    text-align: center;
    margin: 15px 0;
`;