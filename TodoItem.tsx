import { useContext } from 'react'
import { Drawer, Colors, Checkbox } from 'react-native-ui-lib'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { DataContext } from './Context'

interface TodoItemProps {
    id: string,
}

export interface TodoItemData {
    id: string,
    text: string,
    done: boolean,
}

export function TodoItem({ id }: TodoItemProps) {
    const height = useSharedValue(60)
    const { data, setData } = useContext(DataContext)

    function myData() {
        return data.find(d => d.id === id)
    }
    function setDone(value: boolean) {
        setData((data) => {
            return data.map((d) => d.id !== id ? d : { id: d.id, text: d.text, done: value })
        })
    }

    const animatedStyle = useAnimatedStyle(() => ({
        height: height.value
    }));

    function remove() {
        const dur = 100
        height.value = withTiming(0, { duration: dur })
        setTimeout(() => setData((d) => d.filter(x => x.id !== id)), dur)
    }

    return (
        <Animated.View style={animatedStyle}>
            <Drawer disableHaptic={true} flex containerStyle={{ justifyContent: 'center' }}
                leftItem={{ text: 'Delete', background: Colors.red30, onPress: remove }} fullSwipeLeft={true} onFullSwipeLeft={remove}>
                <Checkbox marginL-s4 marginV-s4 value={myData().done} onValueChange={setDone} color={Colors.green30} containerStyle={{ backgroundColor: Colors.white }}
                    label={myData().text} labelProps={{ text70: true }}
                    labelStyle={myData().done ? { textDecorationLine: 'line-through', color: Colors.grey30, textDecorationColor: Colors.grey30 } : {}} />
            </Drawer>
        </Animated.View>
    )
}
