import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AutocompleteDropdown, AutocompleteDropdownItem } from 'react-native-autocomplete-dropdown';
import Toast from 'react-native-toast-message';
import { ThemedText } from './ThemedText';

type LocationItem = {
  skyId: string;
  entityId: string;
  title: string;
};
export type LocationAutocompleteInputProps = {
  label?: string;
  value: LocationItem;
  onChange: (value: LocationItem) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
};

export interface LocationSuggestion {
  skyId: string;
  entityId: string;
  presentation: {
    title: string;
    suggestionTitle: string;
    subtitle: string;
  };
  navigation: {
    entityId: string;
    entityType: 'CITY' | 'AIRPORT' | string;
    localizedName: string;
  };
  relevantFlightParams: {
    skyId: string;
    entityId: string;
    flightPlaceType: 'CITY' | 'AIRPORT' | string;
    localizedName: string;
  };
  relevantHotelParams: {
    entityId: string;
    entityType: 'CITY' | 'AIRPORT' | string;
    localizedName: string;
  };
}
const data = [{"entityId": "27539733", "navigation": {"entityId": "27539733", "entityType": "CITY", "localizedName": "Paris", "relevantFlightParams": [Object], "relevantHotelParams": [Object]}, "presentation": {"subtitle": "France", "suggestionTitle": "Paris (Any)", "title": "Paris"}, "skyId": "PARI"}, {"entityId": "95565041", "navigation": {"entityId": "95565041", "entityType": "AIRPORT", "localizedName": "Paris Charles de Gaulle", "relevantFlightParams": [Object], "relevantHotelParams": [Object]}, "presentation": {"subtitle": "France", "suggestionTitle": "Paris Charles de Gaulle (CDG)", "title": "Paris Charles de Gaulle"}, "skyId": "CDG"}, {"entityId": "95565040", "navigation": {"entityId": "95565040", "entityType": "AIRPORT", "localizedName": "Paris Orly", "relevantFlightParams": [Object], "relevantHotelParams": [Object]}, "presentation": {"subtitle": "France", "suggestionTitle": "Paris Orly (ORY)", "title": "Paris Orly"}, "skyId": "ORY"}, {"entityId": "95566278", "navigation": {"entityId": "95566278", "entityType": "AIRPORT", "localizedName": "Paris Beauvais", "relevantFlightParams": [Object], "relevantHotelParams": [Object]}, "presentation": {"subtitle": "France", "suggestionTitle": "Paris Beauvais (BVA)", "title": "Paris Beauvais"}, "skyId": "BVA"}, {"entityId": "99539667", "navigation": {"entityId": "99539667", "entityType": "AIRPORT", "localizedName": "Montego Bay", "relevantFlightParams": [Object], "relevantHotelParams": [Object]}, "presentation": {"subtitle": "Jamaica", "suggestionTitle": "Montego Bay (MBJ)", "title": "Montego Bay"}, "skyId": "MBJ"}, {"entityId": "99539636", "navigation": {"entityId": "99539636", "entityType": "AIRPORT", "localizedName": "Kingston Norman Manley", "relevantFlightParams": [Object], "relevantHotelParams": [Object]}, "presentation": {"subtitle": "Jamaica", "suggestionTitle": "Kingston Norman Manley (KIN)", "title": "Kingston Norman Manley"}, "skyId": "KIN"}, {"entityId": "104120332", "navigation": {"entityId": "104120332", "entityType": "AIRPORT", "localizedName": "Paros", "relevantFlightParams": [Object], "relevantHotelParams": [Object]}, "presentation": {"subtitle": "Greece", "suggestionTitle": "Paros (PAS)", "title": "Paros"}, "skyId": "PAS"}, {"entityId": "104120372", "navigation": {"entityId": "104120372", "entityType": "AIRPORT", "localizedName": "L.F. Wade International", "relevantFlightParams": [Object], "relevantHotelParams": [Object]}, "presentation": {"subtitle": "Bermuda", "suggestionTitle": "L.F. Wade International (BDA)", "title": "L.F. Wade International"}, "skyId": "BDA"}]


export function LocationAutocomplete({
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder = 'Ville ou aéroport...',

}: LocationAutocompleteInputProps) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AutocompleteDropdownItem[]>([]);
  const [completedSuggestions, setCompletedSuggestions] = useState<LocationSuggestion[]>([]);
//   const [inputValue, setInputValue] = useState(value);

//   useEffect(() => {
//     setInputValue(value);
//   }, [value]);
const fetchSuggestions = async (query: string) => {
    setLoading(true);
    const options = {
        method: 'GET',
        url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport',
        params: {
            query: query,
            locale: 'en-US'
        },
        headers: {
            'x-rapidapi-key': 'c80a8aa0a3msh7524a0bb70dbec8p1b5316jsn0aa1fad9d04c',
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        console.log(response.data);
        const results = response.data.data as LocationSuggestion[];
        setCompletedSuggestions(results)
        const suggestionsList = results.map((item) => ({
            id: item.skyId,
            title: item.presentation.title,
        }));
        setSuggestions(suggestionsList);
    } catch (err: any) {
      console.error('API Error:', err);
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: `'Impossible de récupérer les suggestions. ${err.message}`,
      })
      setSuggestions([]);
    } finally {
        setLoading(false);
    }
};

  return (
    <View style={styles.container}>
        {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnSubmit={false}
        direction="down"
        emptyResultText="Aucun résultat"
        debounce={1000}
        loading={loading}
        onChangeText={(text) => {
        //   onChange(text);
        //   setInputValue(text);
            if (text.length >= 3) {
                fetchSuggestions(text);
            }
        }}
        onClear={() => {
          onChange({ skyId: '', entityId: '', title: '' });
        //   setInputValue('');
        }}
        onSelectItem={(item) => {
          if (item) {
            const selectedTitle = item.title ?? '';
            const selectedItem = completedSuggestions.find((i) => i.presentation.title === selectedTitle);
            let locationItem: LocationItem = { skyId: selectedItem?.skyId ?? '', entityId: selectedItem?.entityId ?? '', title: selectedTitle };
            if (selectedItem) {
              console.log("selectedItem found", selectedItem)
              onChange(locationItem);
            }else {
                console.warn('Selected item not found in data:', selectedTitle);
            }
            // onChange(selectedTitle);
            // setInputValue(selectedTitle);

          } else {
            console.warn('No item selected');
          }
        }}
        // dataSet={data.map((item) => ({
        //   id: item.skyId,
        //   title: item.presentation.title,

        // }))}
        dataSet={suggestions}
        inputContainerStyle={styles.inputContainer}
        suggestionsListTextStyle={{ color: '#333' }}
        suggestionsListContainerStyle={{
            backgroundColor: '#fff',
        }}
        textInputProps={{
          placeholder,
          autoCorrect: false,
          autoCapitalize: 'none',
          onBlur,
          style: styles.textInput,
        //   value: inputValue,
        //   onChangeText: onChange,
          placeholderTextColor: '#888',
        }}
      />
      {touched && error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    // zIndex: 1000,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    // marginBottom: 4,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    height: 48,
    justifyContent: 'center',
  },
  textInput: {
    color: 'black', // Texte visible
    fontSize: 16,
    height: 48,
    paddingHorizontal: 12,
  },
  error: {
    color: '#e57373',
    fontSize: 12,
    lineHeight: 16
    // marginTop: 4,
  },
});
