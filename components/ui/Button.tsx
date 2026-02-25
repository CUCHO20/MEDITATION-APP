import { zinc } from '@/utils/colors';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'muted';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<TouchableOpacityProps, 'onPress'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  onPress,
  children,
  style,
  textStyle,
  ...rest
}: ButtonProps) {
  const getContainerStyle = () => {
    const base: ViewStyle = {
      ...styles.base,
      ...sizeStyles[size],
      width: fullWidth ? '100%' : undefined,
      opacity: disabled || loading ? 0.55 : 1,
    };

    switch (variant) {
      case 'primary':
        return { ...base, borderWidth: 0 };
      case 'secondary':
        return { ...base, backgroundColor: zinc[700], borderWidth: 0 };
      case 'muted':
        return { ...base, backgroundColor: zinc[900], borderWidth: 0 };
      case 'outline':
        return {
          ...base,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: zinc[600],
        };
      case 'ghost':
        return { ...base, backgroundColor: 'transparent', borderWidth: 0 };
      default:
        return base;
    }
  };

  const getTextStyle = () => {
    const baseText: TextStyle = {
      ...styles.text,
      ...sizeTextStyles[size],
    };

    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'muted':
        return { ...baseText, color: zinc[50] };
      case 'outline':
      case 'ghost':
        return { ...baseText, color: zinc[800] };
      default:
        return baseText;
    }
  };

  const containerStyle = getContainerStyle();
  const finalTextStyle = getTextStyle();

  const content = loading ? (
    <ActivityIndicator color={zinc[300]} size="small" />
  ) : (
    <Text style={[finalTextStyle, textStyle]}>{children}</Text>
  );

  if (variant === 'primary' && !disabled && !loading) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        disabled={disabled || loading}
        style={[containerStyle, style]}
        {...rest}
      >
        <LinearGradient
          colors={[zinc[700], zinc[900]]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[
            StyleSheet.absoluteFill,
            { borderRadius: containerStyle.borderRadius },
          ]}
        />
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={variant === 'ghost' || variant === 'outline' ? 0.7 : 0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[containerStyle, style]}
      {...rest}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 6,
  },
  text: {
    textAlign: 'center',
  },
});

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: { paddingVertical: 8, paddingHorizontal: 14 },
  md: { paddingVertical: 12, paddingHorizontal: 20 },
  lg: { paddingVertical: 14, paddingHorizontal: 28 },
};

const sizeTextStyles: Record<ButtonSize, TextStyle> = {
  sm: { fontSize: 14, fontWeight: '500' },
  md: { fontSize: 16, fontWeight: '500' },
  lg: { fontSize: 17, fontWeight: '500' },
};