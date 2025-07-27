import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemedText } from './ThemedText';

type SelectOption = {
  label: string;
  value: string;
};

export type SelectInputProps = {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
};

export function SelectInput({ label, value, options, onChange, error, touched, placeholder }: SelectInputProps) {
  const [open, setOpen] = useState(false);
  // La librairie gère la valeur en interne, on la synchronise avec Formik via onChangeValue
  const [currentValue, setCurrentValue] = useState(value);

  return (
    // Le zIndex est crucial pour que le dropdown s'affiche par-dessus les éléments suivants
    <View style={[styles.container, { zIndex: open ? 1000 : 1 }]}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <DropDownPicker
        open={open}
        value={currentValue}
         listMode="SCROLLVIEW"
        items={options}
        setOpen={setOpen}
        setValue={setCurrentValue}
        onChangeValue={(val) => {
          if (val) {
            onChange(val);
          }
        }}
        placeholder={placeholder || 'Sélectionner...'}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderText}
        dropDownContainerStyle={styles.dropDownContainer}
        listItemLabelStyle={styles.listItemLabel}
        arrowIconStyle={styles.arrowIcon}
        tickIconStyle={styles.tickIcon}
      />
      {touched && error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: '600' },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    height: 48,
  },
  placeholderText: { color: '#888', fontSize: 16 },
  dropDownContainer: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  listItemLabel: {
    color: '#000',
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  tickIcon: {
    width: 20,
    height: 20,
  },
  error: { color: '#e57373', fontSize: 12, marginTop: 4 },
});