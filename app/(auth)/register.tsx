import PasswordInput from "@/components/PasswordInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { register } from "@/services/authService";
import { useRouter } from 'expo-router';
import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Keyboard, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

export default function Register() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false)
  // const navigation = useNavigation();
  const router = useRouter();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email(t('validation.invalidEmail')).required(t('validation.required')),
    password: Yup.string().min(6, t('validation.passwordMin')).required(t('validation.required')),
  });

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <ThemedView style={styles.container}>
          <ThemedText style={styles.title} type="title">{t('auth.registerTitle')}</ThemedText>

          <ThemedText style={styles.description}>
            {t('auth.registerDescription')}
          </ThemedText>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={async(values) => {
            console.log('Submitting...', values);
            try {
              setIsLoading(true)
              await register(values.email, values.password);
              Toast.show({
                type: 'success',
                text1: t('message.registerSuccess'),
                text2: t('message.welcome'),
              });
              router.push('/explore/search');
            } catch (err: any) {
              console.log("Error during login", err);
              Toast.show({
                type: 'error',
                // text1: 'Erreur',
                text1: t('message.error'),
                text2: err.message || 'Une erreur est survenue',
              });
            }finally {
              setIsLoading(false)
            }
            
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
              <View style={styles.inputBox}>
                <TextInput
                placeholder={t('auth.email')}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                />
                {touched.email && errors.email && (
                <ThemedText style={styles.error}>{errors.email}</ThemedText>
                )}
              </View>

              <PasswordInput
                placeholder={t('auth.password')}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                touched={touched.password}
                error={errors.password}
              />

              {/* <TouchableOpacity style={styles.forgot}>
              <ThemedText style={styles.forgotText}>
                {t('auth.forgotPassword')}
              </ThemedText>
              </TouchableOpacity> */}

              <TouchableOpacity style={styles.button} disabled={isLoading}  onPress={() => handleSubmit()}>
                {isLoading ? <ActivityIndicator color="#fff" /> : <ThemedText style={styles.buttonText}>{t('auth.register')}</ThemedText>}
              </TouchableOpacity>

              <ThemedText style={styles.bottomText}>
                {t("auth.backToLogin")} {(" ")}
                  <ThemedText onPress={() => router.push('/login')} style={styles.link}>{t("auth.login")}</ThemedText>

              </ThemedText>
            </View>
            )}
          </Formik>
        </ThemedView>
      </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
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
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    // marginBottom: 4,
    backgroundColor: '#fff',
  },
  error: {
    color: '#e57373',
    fontSize: 12,
    // marginBottom: 8,
  },
  forgot: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  forgotText: {
    color: '#0a7ea4',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomText: {
    textAlign: 'center',
    fontSize: 14,
  },
  link: {
    color: '#0a7ea4',
    fontWeight: '600',
  },
});