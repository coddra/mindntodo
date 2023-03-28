import { useState, useEffect } from 'react'
import { AppState } from 'react-native';
import { View } from 'react-native-ui-lib'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { DataContext, DialogContext } from './Context'
import { TodoList } from './TodoList'
import { AddButton } from './AddButton'
import { AddDialog } from './AddDialog'
import { TodoItemData } from './TodoItem'

export default function App() {
  const [data, setData] = useState([] as TodoItemData[])
  useEffect(() => {
    AsyncStorage.getItem('Todo').then((result) => {
      if (result) {
        setData(JSON.parse(result))
      }
    })
  }, [])

  const [showDialog, setShowDialog] = useState(false)

  AppState.addEventListener('change', state => {
    if (state === 'background' || state === 'inactive') {
      AsyncStorage.setItem('Todo', JSON.stringify(data));
    }
  });

  return (
    <DataContext.Provider value={{ data, setData }}>
      <DialogContext.Provider value={{ showDialog, setShowDialog }}>
        <View flex>
          <TodoList />
          <AddButton setShowDialog={setShowDialog} />
          <AddDialog show={showDialog} setShow={setShowDialog} setData={setData} />
        </View>
      </DialogContext.Provider>
    </DataContext.Provider>
  )
}
