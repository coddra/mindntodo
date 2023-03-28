import { useState, useEffect } from 'react'
import { AppState } from 'react-native';
import { SortableList, View } from 'react-native-ui-lib'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AddButton } from './AddButton'
import { TodoItem, TodoItemData } from './TodoItem'
import { AddDialog } from './AddDialog'

export function TodoList() {
    let [data, setData] = useState([] as TodoItemData[])
    useEffect(() => {
        AsyncStorage.getItem('Todo').then((result) => {
            if (result) {
                setData(JSON.parse(result))
            }
        })
    }, [])

    let [showDialog, setShowDialog] = useState(false)

    AppState.addEventListener('change', state => {
        if (state === 'background' || state === 'inactive') {
            AsyncStorage.setItem('Todo', JSON.stringify(data));
        }
    });

    return (
        <View flex>
            <SortableList
                data={data}
                onOrderChange={setData}
                renderItem={({ item }) => {
                    return <TodoItem id={item.id} data={data} setData={setData} />
                }}
            />
            <AddButton setShowDialog={setShowDialog} />
            <AddDialog show={showDialog} setShow={setShowDialog} setData={setData} />
        </View>
    )
}
