import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

type PasswordInputProps = {
  value: string;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void;
} & TextInputProps;

export default function PasswordInput({
  value,
  placeholder,
  error,
  touched,
  onChangeText,
  onBlur,
  ...rest
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={!showPassword}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(prev => !prev)}
          style={styles.icon}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      {touched && error && (
        <ThemedText style={styles.error}>{error}</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 16,
  },
  inputWrapper: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingRight: 40,
  },
  input: {
    padding: 12,
    paddingRight: 40,
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  error: {
    color: '#e57373',
    marginTop: 4,
    fontSize: 13,
  },
});
