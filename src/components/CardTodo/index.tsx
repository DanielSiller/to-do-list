import React, { useEffect, useRef, useState } from "react";
import { Modal, FlatList, TouchableOpacityProps } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ModalDropdown from "react-native-modal-dropdown";
import { Feather } from '@expo/vector-icons';
import { useTheme } from "styled-components";
import { Q } from "@nozbe/watermelondb";
import { createURL, openURL } from 'expo-linking'

import { SubTaskModel } from "../../databases/models/subTaskModel";
import { TaskModel } from "../../databases/models/taskModel";
import { database } from "../../databases";
import { EmptyCard } from "../EmptyCard";
import { Button } from "../Button";

import { 
  Container,
  Icon,
  Name,
  Options,
  Option,
  ModalContainer,
  ModalContent,
  ModalHeader,
  Title,
} from './styles';

export type ToDoProps = {
  type: 'list' | 'task' | 'subtask';
  name: string;
  taskId?: string;
  listId?: string;
}

interface Props extends TouchableOpacityProps {
  data: ToDoProps;
  onRemove: () => void;
  onEdit: () => void;
  onFetchData?: () => void;
}

export function CardTodo({
  data,
  onEdit,
  onRemove,
  onFetchData,
  ...rest
}: Props) {
  const theme = useTheme()
  const [ tasks, setTasks ] = useState<TaskModel[]>([])
  const [index, setIndex] = useState<string | number>(null)
  const [visible, setVisible] = useState(false)
  const modalDropdownRef = useRef<ModalDropdown | null>(null);
  const [itemChecked, setItemChecked] = useState<TaskModel>({} as TaskModel)
  const options = data.type === 'task' 
  ? [
    'Alterar nome',
    'Transformar tarefa em sub tarefa',
    ''
    ]
  : [
    'Alterar nome',
    'Mover sub tarefa para outra tarefa',
    'Transformar sub tarefa em tarefa',
    ]
  

  useEffect(() => {
    if(index !== null) {
      handleSelect()
    }
  }, [index])

  async function handleSelect() {
    const response = await database.get<TaskModel>('task')
    .query(
      Q.where('listId', data.listId)
    )
    .fetch()

    setTasks(response)

    switch (index) {
      case 0:
        onEdit()
        break;
      case 1:
        setVisible(true)
        break;
      case 2:
        await handleSave()
        break;
      default:
        break;
    }
    
    modalDropdownRef.current?.select(-1)
    setIndex(null)
  }

  async function handleSave() {
    if(itemChecked.id) {
      const response = await database.get<SubTaskModel>('sub_task')
      .query(
        Q.where('taskId', itemChecked.id)
      )
      .fetch()

      await database.write(async () => {
        await database.get<SubTaskModel>('sub_task').create(subtask => {
          subtask.title = data.name,
          subtask.taskId = itemChecked.id
          subtask.order = response.length + 1
        })
      })
    } else {
      await database.write(async () => {
        await database.get<TaskModel>('task').create(task => {
          task.title = data.name,
          task.listId = data.listId,
          task.order = tasks.length + 1
        })
      })
    }

    onRemove()
    onFetchData()
    setItemChecked({} as TaskModel)
  }

  function openMail() {
    const url = createURL(`todolist/list/${data.listId}/${data.name}`, {})

    openURL(`mailto:teste-tecnico@vibbra.com.br?subject=To-Do&body=Estou compartilhando minha lista de tarefas, para acessar click no link abaixo%0A%0A${url}`)
  }

  return( 
    <Container {...rest}>
      {data.type === 'list' 
      ?
      <>
        <Icon>
          <Feather
            name='list'
            color="#FFF"
            size={20}
          />
        </Icon>
        <Name>{data.name}</Name>
      </>

      : <BouncyCheckbox 
        onPress={(isChecked: boolean) => {}}
        text={data.name}
        textStyle={{ color: theme.colors.shape }}
        style={{ flex: 1 }}
        fillColor={theme.colors.blue}
        />}

      <Options type={data.type}>
        {data.type !== "list"
        ?
          <ModalDropdown
           options={options}
            dropdownTextStyle={{
              color: theme.colors.title,
              fontSize: 12,
              height: 50
            }}
            dropdownStyle={{
              backgroundColor: theme.colors.background,
              height: 150
            }}
            onSelect={(index) => setIndex(index)}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            ref={modalDropdownRef}
          >
              <Feather
                name="edit"
                color={theme.colors.yellow}
                size={20}
              />
          </ModalDropdown> 
        : 
          <Option onPress={onEdit}>
            <Feather
              name="edit"
              color={theme.colors.yellow}
              size={20}
            />
          </Option>
        }
        

        <Option onPress={onRemove}>
          <Feather
            name="trash-2"
            color={theme.colors.attention}
            size={20}
          />
        </Option>

        {data.type === 'list' && 
          <Option onPress={openMail}>
          <Feather
            name="share-2"
            color={theme.colors.blue}
            size={20}
          />
        </Option>
        }
      </Options>
      <Modal transparent visible={visible}>
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <Title>Selecione uma tarefa</Title>
              <Feather 
                name="eye-off"
                size={22}
                color={theme.colors.blue}
                onPress={() => {
                  setVisible(false)
                  setItemChecked({} as TaskModel)
                }}
              />
            </ModalHeader>
            <FlatList
              data={tasks.filter(task => task.id !== data.taskId)}
              renderItem={({ item }) => (
               <Container onPress={() => setItemChecked(item)}>
                <BouncyCheckbox
                  onPress={() => setItemChecked(item)}
                  isChecked={item.id === itemChecked.id ? true : false}
                  fillColor={theme.colors.blue}
                  disableBuiltInState
                />
                <Name>{item.title}</Name>
               </Container> 
              )}
              ListEmptyComponent={
                <EmptyCard
                  title="Você ainda não tem tarefas cadastradas"
                  description="Crie tarefas e organize seus itens a fazer"
                />}
            />
            <Button title={"Confirmar"} disabled={itemChecked.id ? false : true} onPress={() => handleSave()}/>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  )
}