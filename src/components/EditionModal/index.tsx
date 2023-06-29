import React from "react";

import { 
  Container,
  Icon,
  CenteredView,
  ModalView,
  ModalHeader,
  ModalContent,
  Input,
  Button,
  SubTitle,
  ButtonIcon
} from './styles';


interface Props {
  setName: (value: string) => void;
  setVisible: (value: boolean) => void;
  handleSave: () => void;
  isEdit: boolean;
  visible: boolean;
  name: string;
}

export function EditionModal({
  setName,
  handleSave,
  isEdit,
  visible,
  setVisible,
  name
}: Props) {

  function handleCloseModal() {
    setVisible(false)
    setName('')
  }

  return( 
    <Container visible={visible} transparent animationType="slide">
      <CenteredView>
        <ModalView>
          <ModalHeader>
            <ButtonIcon>
                <Icon name="eye-off" size={22} onPress={handleCloseModal}/>
            </ButtonIcon>
          </ModalHeader>
          <ModalContent>
            <SubTitle>Digite o nome</SubTitle>
            <Input value={name} onChangeText={setName}/>
          </ModalContent>
          <Button onPress={handleSave}>
            <SubTitle>{isEdit ? `Editar` : 'Criar'}</SubTitle>
          </Button>
        </ModalView>
      </CenteredView>
    </Container>
  )
}