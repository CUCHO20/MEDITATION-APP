import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacityProps, ViewStyle } from 'react-native';
import { Button } from './Button';

interface Props extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
}

function ContinueButton({ style, ...props }: Props) {
  return (
    <Button {...props} variant="secondary" >
      <Text style={styles.text}>Continue</Text>
      <Ionicons name="caret-forward-outline" size={18} style={styles.icon} />
    </Button>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#f4f4f5' // 100
  },
  icon: {
    color: '#f4f4f5' // 100
  },
});

export default ContinueButton