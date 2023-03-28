import { useContext } from 'react'
import { SortableList, View } from 'react-native-ui-lib'

import { TodoItem } from './TodoItem'
import { DataContext } from './Context'

export function TodoList() {
    const { data, setData } = useContext(DataContext)

    return (
        <SortableList
            data={data}
            onOrderChange={d => setData(data => d)}
            renderItem={({ item }) => {
                return <TodoItem id={item.id} />
            }}
        />
    )
}
