import React, { useEffect, useState } from "react";
import { FlatList, Modal } from "react-native";
import { useTheme } from "styled-components";
import { Q } from "@nozbe/watermelondb";

import { ListModel } from "../../databases/models/listModel";
import { EditionModal } from "../../components/EditionModal";
import { EmptyCard } from "../../components/EmptyCard";
import { CardTodo } from "../../components/CardTodo";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { database } from "../../databases";

import { 
  Container,
  ListHeader,
  SubTitle,
  ButtonIcon,
  Icon,
  ModalContainer,
  ModalContent,
  ModalDescription,
  ModalTitle,
} from "./styles";


export function Home({ navigation: { navigate } }) {
  const [visible, setVisible] = useState(false)
  const [helpVisible, setHelpVisible] = useState(false)
  const [nameTodo, setNameTodo] = useState('')
  const [lists, setLists] = useState<ListModel[]>([])
  const [list, setList] = useState<ListModel>({} as ListModel)
  const theme = useTheme()

  useEffect(() => {
    fetchData()
  }, [])

  async function handleRemove(item: ListModel) {
    if(item.token === "c2ab4937-1dd6-46fe-bf7f-a7eb4abe1b78") {
      await database.write(async () => {
        await item.destroyPermanently()
      })
  
      await fetchData()
    }
  }

  async function handleSave() {
    if(list.id) {
      await database.write(async () => {
        await list.update(data => {
          data.name = nameTodo
          data.permalink = `list/${nameTodo}`
        })
      })
      setList({} as ListModel)
    } else {
      await database.write(async () => {
        const response = await database.get<ListModel>('list').create(data => {
          data.name = nameTodo
          data.permalink = `list/${nameTodo}`
          data.token = 'c2ab4937-1dd6-46fe-bf7f-a7eb4abe1b78'
        })
        navigate('List', {
          listId: response.id,
          listName: response.name
        })
      })
    }
    await fetchData()
    setVisible(false)
  }

  async function handleEdit(item: ListModel) {
    setList(item)
    setNameTodo(item.name)
    setVisible(true)
  }


  async function fetchData() {
    const response = await database.get<ListModel>('list').query(
      Q.where('token', 'c2ab4937-1dd6-46fe-bf7f-a7eb4abe1b78')
    ).fetch()

    setLists(response)
  }

  function handleHelpModal() {
    setHelpVisible(!helpVisible)
  }

  return(
    <Container>
      <Header/>
      <ListHeader>
        <SubTitle>Meus To-Do</SubTitle>
        <ButtonIcon onPress={handleHelpModal}>
          <Icon name="help-circle" color={theme.colors.shape} size={22}/>
        </ButtonIcon>
      </ListHeader>
      <FlatList  
        data={lists}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CardTodo 
          onPress={() => navigate('List', {
            listId: item.id,
            listName: item.name
          })}
          data={{
            name: item.name,
            type: "list",
            listId: item.id
          }}
          onRemove={() => handleRemove(item)}
          onEdit={() => handleEdit(item)}
          />
        )}
        ListEmptyComponent={
        <EmptyCard 
          title="Você ainda não tem listas cadastradas"
          description="Crie listas e organize seus itens a fazer"
        />}
      />
      {!visible && <Button onPress={() => setVisible(true)} title="Criar nova lista"/>}
      
      <EditionModal
        handleSave={handleSave}
        isEdit={list.id ? true : false}
        setName={setNameTodo}
        name={nameTodo}
        visible={visible}
        setVisible={setVisible}
      />

      <Modal transparent visible={helpVisible}>
          <ModalContainer>
            <ModalContent>
              <ModalTitle>Sobre</ModalTitle>
              <ModalDescription>Essa ferramenta trata-se de um projeto onde qualquer pessoa que gostaria de ter uma lista de tarefas com sub-tarefas em um endereço público, que possa ser compartilhado por e-mail para um ou mais usuários e estes, quando receberem o link, possam colaborar.</ModalDescription>
              <Button onPress={handleHelpModal} title="Entendi"/>
            </ModalContent>
          </ModalContainer>
      </Modal>
    </Container>
  )
}