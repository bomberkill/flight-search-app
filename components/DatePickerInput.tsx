import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';

export type DatePickerInputProps = {
  label: string;
  value: string; // La date au format YYYY-MM-DD depuis Formik
  onChange: (date: string) => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
};

export function DatePickerInput({ label, value, onChange, error, touched, disabled = false, minDate, maxDate }: DatePickerInputProps) {
  const [showPicker, setShowPicker] = useState(false);
  const {t, i18n} = useTranslation();

  // Utilise la date de Formik si elle existe, sinon la date d'aujourd'hui
  const currentDate = value ? new Date(value) : new Date();

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    // Sur Android, le picker se ferme tout seul. Sur iOS, on le ferme manuellement.
    setShowPicker(false);
    if (event.type === 'set' && selectedDate) {
      // Formate la date en YYYY-MM-DD pour la cohérence
      const formattedDate = selectedDate.toISOString().split('T')[0];
      onChange(formattedDate);
    }
  };

  const formattedDisplayDate = value
    ? new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60000).toLocaleDateString(i18n.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : t('search.placeholders.datePicker');

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <TouchableOpacity onPress={() => !disabled && setShowPicker(true)} style={[styles.inputContainer, disabled && styles.disabled]}>
        <ThemedText style={value ? styles.dateText : styles.placeholderText}>
          {formattedDisplayDate}
        </ThemedText>
        <IconSymbol name="calendar" size={20} color="#666" />
      </TouchableOpacity>
      {touched && error && <ThemedText style={styles.error}>{error}</ThemedText>}

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={currentDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={minDate ? new Date(minDate) : new Date()}
          maximumDate={maxDate ? new Date(maxDate) : undefined}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: '600' },
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
  dateText: { color: 'black', fontSize: 16 },
  placeholderText: { color: '#888', fontSize: 16 },
  disabled: { backgroundColor: '#f0f0f0' },
  error: { color: '#e57373', fontSize: 12, lineHeight: 16 },
});