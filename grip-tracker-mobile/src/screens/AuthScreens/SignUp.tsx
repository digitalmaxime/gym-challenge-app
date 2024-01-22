import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Constants from 'expo-constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import Colors from '../../constants/styles';
import { auth, handleSignUp } from '../../utils/auth';
import { ButtonText } from '../../components/basics/Buttons';

type FormData = {
  confirmedPassword: string;
  email: string;
  password: string;
};

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

type RootStackParamList = Record<string, Record<string, never>>;

function SignUp() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [isAuthenticationInProgress, setIsAuthenticationInProgress] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const toast = useToast();
  useEffect(() => {
    if (!isEmailSent) return;

    toast.show('Un courriel de validation a été envoyé!\nJetez un coup d\'oeil à vos pourriels', {
      type: 'success',
      placement: 'top',
      duration: 8000,
      animationType: 'slide-in',
      swipeEnabled: true,
    });
  }, [isEmailSent]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmedPassword: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsAuthenticationInProgress(true);
    try {
      await handleSignUp(data.email, data.password);
      setIsEmailSent(true);
    } catch (error) {
      const message = (error instanceof Error) ? error.message : String(error);
      console.error({ message });
      if (message.includes('email-already-in-use')) {
        toast.show('L\'adresse courriel déjà utilisée..', {
          type: 'warning',
          placement: 'top',
          duration: 5000,
          animationType: 'zoom-in',
          swipeEnabled: true,
        });
      } else {
        toast.show('La création de compte a échoué..', {
          type: 'danger',
          placement: 'top',
          duration: 8000,
          animationType: 'zoom-in',
          swipeEnabled: true,
        });
      }
      await auth.signOut();
    } finally {
      setIsAuthenticationInProgress(false);
      setIsEmailSent(false);
    }
  };

//   if (isAuthenticationInProgress) {
//     return <LoadingOverlay message="merci de patienter.." />;
//   }

  return (
    <View style={styles.container}>
      {/** ******* EMAIL ********* */}
      <Text style={styles.label}>Courriel</Text>
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              value={value}
            />
            {errors.email && (
              <Text style={styles.errorText}>{error?.message || 'Erreur'}</Text>
            )}
          </>
        )}
        name="email"
        rules={{
          required: true,
          pattern: { value: EMAIL_REGEX, message: 'courriel non valide' },
        }}
      />

      {/** ******* PASSWORD ********* */}
      <Text style={styles.label}>Mot de passe</Text>
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              value={value}
              secureTextEntry
            />

            {errors.password && (
              <Text style={styles.errorText}>{error?.message || 'Erreur'}</Text>
            )}
          </>
        )}
        name="password"
        rules={{ required: true, minLength: { value: 6, message: '6 caractères minimum' } }}
      />

      {/** ******* CONFIRM PASSWORD ********* */}
      <Text style={styles.label}>Confirmez le mot de passe</Text>
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              value={value}
              secureTextEntry
            />

            {errors.confirmedPassword && (
              <Text style={styles.errorText}>{error?.message || 'Erreur'}</Text>
            )}
          </>
        )}
        name="confirmedPassword"
        rules={{
          required: true,
          validate: value => value === getValues().password || 'les mots de passe diffèrent..',
        }}
      />

      <View style={styles.buttonsContainer}>
        <ButtonText
          onPress={handleSubmit(onSubmit)}
          textContent="créer le compte"
          btnHeight={60}
          btnWidth={300}
          padding={8}
          btnImgBackgroundColor={Colors.btnCheckBorderColor}
          disabled={false}
        />

        <ButtonText
          onPress={() => {
            reset({ email: 'courriel', password: 'mot de passe' });
            navigation.navigate('Login', {});
          }}
          textContent="page de connexion"
          btnHeight={60}
          btnWidth={300}
          padding={8}
          btnImgBackgroundColor={Colors.transparent}
          disabled={false}
        />
        <ButtonText
          onPress={() => {
            reset({
              email: 'maxime.rheault@gmail.com',
              password: '12345678',
              confirmedPassword: '12345678'
            });
          }}
          textContent="reset ** DEV ONLY **"
          btnHeight={60}
          btnWidth={300}
          padding={8}
          btnImgBackgroundColor={Colors.transparent}
          disabled={false}
        />
      </View>
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#0e101c',
  },
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  buttonsContainer: {
    padding: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  errorText: { color: '#fc5555' },
  errorOutline: {
    borderColor: 'red',
    borderWidth: 3,
    borderRadius: 4,
  },
});
