import React, { useEffect, useState, useRef } from "react";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useTheme } from "styled-components";
import { Q } from "@nozbe/watermelondb";
import { FlatList } from "react-native";

import { SubTaskModel } from "../../databases/models/subTaskModel";
import { TaskModel } from "../../databases/models/taskModel";
import { EditionModal } from "../../components/EditionModal";
import { EmptyCard } from "../../components/EmptyCard";
import { CardTodo } from "../../components/CardTodo";
import { Header } from "../../components/Header";
import { database } from "../../databases";

import { 
  Container,
  Title,
  ListHeader,
  CreateContainer,
  Input,
  ButtonIcon,
  Icon,
  HeaderEdit,
} from "./styles";

export function ToDo({ route }) {
  const theme = useTheme()
  const { listId, listName } = route.params;
  const [ tasks, setTasks ] = useState<TaskModel[]>([])
  const [ task, setTask ] = useState<TaskModel>({} as TaskModel)
  const [ editTask, setEditTask ] = useState<TaskModel>({} as TaskModel)
  const [ subTasks, setSubTasks ] = useState<SubTaskModel[]>([])
  const [ subTask, setSubTask ] = useState<SubTaskModel>({} as SubTaskModel)
  const [ taskName, setTaskName ] = useState('')
  const [ visibleTask, setVisibleTask ] = useState(false)
  const [ visibleSubTask, setVisibleSubTask ] = useState(false)
  const [ editTaskName, setEditTaskName ] = useState('')
  const [ subTaskName, setSubTaskName ] = useState('')
  const [ editSubTaskName, setEditSubTaskName ] = useState('')
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    fetchTasksList()
  }, [listId])

  async function fetchTasksList() {
    const TaskResponse = await database.get<TaskModel>('task')
    .query([
        Q.where('listId', listId),
        Q.sortBy('order')
      ])
      .fetch()

    setTasks(TaskResponse)
  }

  async function fetchSubTaskList(task: TaskModel) {
    const response = await database.get<SubTaskModel>('sub_task')
    .query([
      Q.where('taskId', task.id),
      Q.sortBy('order')
    ])
    .fetch()
    
    setSubTasks(response)
  }

  async function handleSave() {
    if(editTask.id) {
      await database.write(async () => {
        await editTask.update(data => {
          data.title = editTaskName
        })
      })
      setEditTask({} as TaskModel)
      setEditTaskName('')
      setVisibleTask(false)
    } else {
      await database.write(async () => {
        await database.get<TaskModel>('task').create(data => {
          data.title = taskName,
          data.listId = listId,
          data.order = tasks.length + 1
        })
      })
      setTaskName('')
    }
    await fetchTasksList()
  }
  

  async function handleRemoveTask(item: TaskModel) {
    await database.write(async () => {
      await item.destroyPermanently()
    })

    await fetchTasksList()
  }

  function handleEditTask(item: TaskModel) {
    setEditTask(item)
    setEditTaskName(item.title)
    setVisibleTask(true)
  }

  function handleEditSubTask(item: SubTaskModel) {
    setSubTask(item)
    setEditSubTaskName(item.title)
    setVisibleSubTask(true)
  }

  async function handleTask(item: TaskModel) {
    setTask(item)
    await fetchSubTaskList(item)
    bottomSheetModalRef.current.present()
  }

  async function handleRemoveTaskSubTask(item: SubTaskModel) {
    await database.write(async () => {
      await item.destroyPermanently()
    })

    await fetchSubTaskList(task)
  }

  async function handleSaveSubTask() {
    if(subTask.id) {
      await database.write(async () => {
        await subTask.update(data => {
          data.title = editSubTaskName
        })
      })
      setEditSubTaskName('')
      setVisibleSubTask(false)
      setSubTask({} as SubTaskModel)
    } else {
      await database.write(async () => {
        await database.get<SubTaskModel>('sub_task').create(data => {
          data.title = subTaskName,
          data.taskId = task.id,
          data.order = subTasks.length + 1
        })
      })

      setSubTaskName('')
    }

    await fetchSubTaskList(task)
  }

  
  return(
    <Container>
      <Header/>
      <CreateContainer>
        <Input value={taskName} onChangeText={setTaskName} placeholder="Adicione uma nova tarefa"/>
        <ButtonIcon onPress={handleSave}>
          <Icon name='plus-circle' size={20} color={theme.colors.shape}/>
        </ButtonIcon>
      </CreateContainer>
      <ListHeader>
        <Title>{listName}</Title>
      </ListHeader>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <>
            <CardTodo
              onPress={async () => await handleTask(item)}
              data={{
                name: item.title,
                type: "task",
                listId,
                taskId: item.id
              }}
              onFetchData={fetchTasksList}
              onEdit={() => handleEditTask(item)}
              onRemove={() => handleRemoveTask(item)}
            />
            
          </>
        )}
        ListEmptyComponent={
          <EmptyCard 
            title="Você ainda não tem tarefas cadastradas"
            description="Crie tarefas e organize seus itens a fazer"
          />}
      />

      <BottomSheetModalProvider>
        <BottomSheetModal 
          ref={bottomSheetModalRef}
          snapPoints={['75%', "90%"]}
          backgroundStyle={{
            backgroundColor: theme.colors.gray_600,
            borderColor: theme.colors.gray_400,
            borderWidth: 1
          }}
          handleIndicatorStyle={{
            backgroundColor: theme.colors.background
          }}
        >
        <HeaderEdit>
          <Input
            value={subTaskName}
            onChangeText={(value) => setSubTaskName(value)}
            placeholder="Adicione uma nova sub tarefa"
            autoCorrect={false}
          />
          <ButtonIcon onPress={handleSaveSubTask}>
            <Icon name='plus-circle' size={20} color={theme.colors.shape}/>
          </ButtonIcon>
        </HeaderEdit>
        <FlatList
          data={subTasks}
          renderItem={({ item }) => (
            <CardTodo
              data={{
                name: item.title,
                type: "subtask",
                listId,
                taskId: task.id
              }}
              onEdit={() => handleEditSubTask(item)}
              onFetchData={fetchTasksList}
              onRemove={() => handleRemoveTaskSubTask(item)}
            />
          )}
          ListEmptyComponent={
            <EmptyCard 
              title="Você ainda não tem sub tarefas cadastradas"
              description="Crie sub tarefas e organize seus itens a fazer"
            />}
        />
        </BottomSheetModal>
      </BottomSheetModalProvider>

      <EditionModal
        handleSave={handleSave}
        isEdit={true}
        setName={setEditTaskName}
        name={editTaskName}
        setVisible={setVisibleTask}
        visible={visibleTask}
      />

      <EditionModal
        handleSave={handleSaveSubTask}
        isEdit={true}
        setName={setEditSubTaskName}
        name={editSubTaskName}
        setVisible={setVisibleSubTask}
        visible={visibleSubTask}
      />
    </Container>
  )
}