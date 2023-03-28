import { useContext } from 'react'
import { Button, Colors } from 'react-native-ui-lib'

import { DialogContext } from './Context'

export function AddButton() {
    const { setShowDialog } = useContext(DialogContext)

    return (
        <Button
            iconSource={require('./assets/plus.png')}
            style={{ position: 'absolute', bottom: 16, right: 16, width: 48, height: 48 }}
            backgroundColor={Colors.gray30}
            iconStyle={{ width: 32, height: 32 }}
            onPress={() => setShowDialog(() => true)}
        />
    )
}
