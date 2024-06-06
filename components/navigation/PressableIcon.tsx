// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { Pressable } from 'react-native';

export function PressableIcon({ onPress,size, style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return (
    <>
        <Pressable style={{marginLeft:15}} onPress={onPress}>
            <Ionicons size={size} style={[{ marginBottom: -3 }, style]} {...rest} />
        </Pressable>
    </>
  )
}

// View more icons examples at https://react-icons.github.io/react-icons/icons/io5/