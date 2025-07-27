import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';

export type PassengerInputProps = {
  label: string;
  value: number;
  minValue?: number;
  description?: string;
  error?: string;
  touched?: boolean;
  onChange: (value: number) => void;
};

export function PassengerInput({ label, value, onChange, minValue = 0, description, error, touched }: PassengerInputProps) {
  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > minValue) {
      onChange(value - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <ThemedText style={styles.label}>{label}</ThemedText>
        {description && <ThemedText style={styles.description}>{description}</ThemedText>}
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleDecrement} style={styles.button} disabled={value <= minValue}>
          <IconSymbol name="minus" size={20} color={value <= minValue ? '#ccc' : '#0a7ea4'} />
        </TouchableOpacity>
        <ThemedText style={styles.valueText}>{value}</ThemedText>
        <TouchableOpacity onPress={handleIncrement} style={styles.button}>
          <IconSymbol name="plus" size={20} color="#0a7ea4" />
        </TouchableOpacity>
      </View>
      {touched && error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    // marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 16,
  },
  description: {
    fontSize: 10,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 48,
  },
  button: {
    padding: 8,
  },
  valueText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'center',
  },
  error: {
    color: '#e57373',
    fontSize: 12,
    marginTop: 4,
  },
});
