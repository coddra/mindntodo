import { createContext } from 'react'

import { TodoItemData } from './TodoItem'

export const DataContext = createContext({ data: ([] as TodoItemData[]), setData: ((data: (data: TodoItemData[]) => TodoItemData[]) => { }) as ((data: (data: TodoItemData[]) => TodoItemData[]) => void) })
export const DialogContext = createContext({ showDialog: false, setShowDialog: ((show: (show: boolean) => boolean) => { }) as ((show: (show: boolean) => boolean) => void) })
