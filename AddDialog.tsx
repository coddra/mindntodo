import { useRef, useEffect, useContext } from 'react'
import { TextInput } from 'react-native'
import { Dialog, TextField, Colors, Button } from 'react-native-ui-lib'

import { TodoItemData } from './TodoItem'
import { DataContext, DialogContext } from './Context'

export function AddDialog() {
    const input = useRef<TextInput>(null)
    let text = ''

    const { setData } = useContext(DataContext)
    const { showDialog, setShowDialog } = useContext(DialogContext)

    useEffect(() => {
        if (showDialog) {
            setTimeout(() => input.current?.focus(), 450)
        }
    }, [showDialog])

    function generateID(text: string, data: TodoItemData[]) {
        let i = 0
        while (data.some((d: TodoItemData) => d.id === text + i)) {
            i++
        }
        return text + i
    }
    function submit() {
        if (text !== '') {
            setData((d) => [...d, { id: generateID(text, d), text: text, done: false }])
        }
        setShowDialog((v) => false)
    }

    return (
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(() => false)}
            containerStyle={{ height: 120, backgroundColor: Colors.white, padding: 16, borderRadius: 8 }}>
            <TextField
                ref={input}
                returnKeyType='done'
                placeholder={'Todo'} floatingPlaceholder
                onChangeText={(t) => text = t}
                fieldStyle={{ borderBottomWidth: 2, borderBottomColor: Colors.blue30 }}
                onSubmitEditing={submit}
            />
            <Button
                label={'OK'}
                margin-s4 avoidInnerPadding avoidMinWidth
                style={{ position: 'absolute', right: 0, bottom: 0, width: 48, height: 32, borderRadius: 4, backgroundColor: Colors.blue70, justifyContent: 'center' }}
                labelStyle={{ color: Colors.blue30, fontSize: 12 }}
                onPress={submit}
            />
        </Dialog>
    )
}
