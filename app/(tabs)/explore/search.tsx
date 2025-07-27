import { DatePickerInput } from "@/components/DatePickerInput";
import { LocationAutocomplete } from "@/components/LocationAutocomplete";
import { PassengerInput } from "@/components/PassengerInput";
import { SelectInput } from "@/components/SelectInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from 'expo-router';
import { Formik } from "formik";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Yup from "yup";

export interface SearchParams {
  origin: {
    skyId: string;
    entityId: string;
    title: string;
  };
  destination: {    
    skyId: string;
    entityId: string;
    title: string;
  };
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  travelClass: string;
}
const flightSearchInitialValues: SearchParams = {
  origin: {
    skyId: '',
    entityId: '',
    title: '',

  },
  destination: {
    skyId: '',
    entityId: '',
    title: '',

  },
  departureDate: '',
  returnDate: '',
  adults: 1,
  children: 0,
  infants: 0,
  travelClass: 'economy',
};
export default function SearchScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const travelClassOptions = [
    { label: t('search.travelClasses.economy'), value: 'economy' },
    { label: t('search.travelClasses.premium_economy'), value: 'premium_economy' },
    { label: t('search.travelClasses.business'), value: 'business' },
    { label: t('search.travelClasses.first'), value: 'first' },
  ];

  const flightSearchValidationSchema = useMemo(() => 
    Yup.object().shape({
      origin: Yup.object().shape({
        skyId: Yup.string().required(t('search.validation.originRequired')),
      }),
      destination: Yup.object().shape({
        skyId: Yup.string().required(t('search.validation.destinationRequired')),
      }),
      departureDate: Yup.string()
        .required(t('search.validation.departureDateRequired')),
      returnDate: Yup.string()
        .notRequired()
        .test(
          'return-after-departure',
          t('search.validation.returnDateInvalid'),
          function (value) {
            const { departureDate } = this.parent;
            if (!value) return true; // champ facultatif
            return new Date(value) >= new Date(departureDate);
          }
        ),
      adults: Yup.number()
        .required(t('search.validation.adultsRequired'))
        .min(1, t('search.validation.adultsMin')),
      children: Yup.number()
        .min(0, t('search.validation.childrenMin')),
      infants: Yup.number()
        .min(0, t('search.validation.infantsMin')),
      travelClass: Yup.string()
        .required(t('search.validation.travelClassRequired'))
        .oneOf(['economy', 'premium_economy', 'business', 'first'], t('search.validation.travelClassInvalid')),
    }), [t]); 
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <ThemedView style={styles.container}>
            <Formik
              initialValues={flightSearchInitialValues}
              validationSchema={flightSearchValidationSchema}
              onSubmit={(values) => {
                console.log(values);
                const flatParams = {
                  originSkyId: values.origin.skyId,
                  originEntityId: values.origin.entityId,
                  originTitle: values.origin.title,
                  destinationSkyId: values.destination.skyId,
                  destinationEntityId: values.destination.entityId,
                  destinationTitle: values.destination.title,
                  departureDate: values.departureDate,
                  returnDate: values.returnDate,
                  adults: values.adults.toString(),
                  children: values.children.toString(),
                  infants: values.infants.toString(),
                  travelClass: values.travelClass,
                };
                router.push({ 
                  pathname: '/explore/result',
                  params: flatParams
                });

              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, }) => (
                <View style={styles.form}>
                  <LocationAutocomplete
                    label={t('search.labels.origin')}
                    value={values.origin}
                    onChange={(value) => setFieldValue('origin', value)}
                    onBlur={() => handleBlur('origin')}
                    error={errors.origin?.skyId}
                    touched={touched.origin?.skyId}
                    placeholder={t('search.placeholders.origin')}
                  />
                  <LocationAutocomplete
                    label={t('search.labels.destination')}
                    value={values.destination}
                    onChange={(value) => setFieldValue('destination', value)}
                    onBlur={() => handleBlur('destination')}
                    error={errors.destination?.skyId}
                    touched={touched.destination?.skyId}
                    placeholder={t('search.placeholders.destination')}
                  />
                  <View style={styles.dateRow}>
                    <View style={styles.dateInputContainer}>
                      <DatePickerInput
                        label={t('search.labels.departure')}
                        value={values.departureDate}
                        onChange={(value) => setFieldValue('departureDate', value)}
                        touched={touched.departureDate}
                        error={errors.departureDate}
                        maxDate={values.returnDate || undefined}
                      />
                    </View>
                    <View style={styles.dateInputContainer}>
                       <DatePickerInput
                        label={t('search.labels.return')}
                        value={values.returnDate}
                        onChange={(value) => setFieldValue('returnDate', value)}
                        touched={touched.returnDate}
                        error={errors.returnDate}
                        disabled={!values.departureDate}
                        minDate={values.departureDate}
                      />
                    </View>
                  </View>
                  <SelectInput
                    label={t('search.labels.travelClass')}
                    value={values.travelClass}
                    options={travelClassOptions}
                    onChange={(value) => setFieldValue('travelClass', value)}
                    error={errors.travelClass}
                    touched={touched.travelClass}
                  />
                  <PassengerInput
                    minValue={1}
                    label={t('search.labels.adults')}
                    description={t('search.descriptions.adults')}
                    value={values.adults}
                    error={typeof errors.adults === 'string' ? errors.adults : undefined}
                    touched={!!touched.adults}
                    onChange={(value) => setFieldValue('adults', value)}
                  />
                  <PassengerInput
                    minValue={0}
                    label={t('search.labels.children')}
                    description={t('search.descriptions.children')}
                    value={values.children}
                    error={typeof errors.children === 'string' ? errors.children : undefined}
                    touched={!!touched.children}
                    onChange={(value) => setFieldValue('children', value)}
                  />
                  <PassengerInput
                    minValue={0}
                    label={t('search.labels.infants')}
                    description={t('search.descriptions.infants')}
                    value={values.infants}
                    error={typeof errors.infants === 'string' ? errors.infants : undefined}
                    touched={!!touched.infants}
                    onChange={(value) => setFieldValue('infants', value)}
                  />
                  <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                    <ThemedText style={styles.buttonText}>{t('search.buttons.searchFlights')}</ThemedText>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </ThemedView>
        </ScrollView>
      </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    width: '100%',
  },
  inputBox: {
    marginBottom: 16
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInputContainer: {
    width: '48%',
  },
  error: {
    color: '#e57373',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});