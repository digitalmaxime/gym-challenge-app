import React, { Dispatch, SetStateAction, useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import Constants from 'expo-constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { useToast } from 'react-native-toast-notifications';
import Colors from '../../constants/styles';
import { auth, handleLogin, handleLoginDummy } from '../../utils/auth';
import { useUserContext } from '../../contexts/UserContext';
import { ButtonText } from '../../components/basics/Buttons';

type FormData = {
  email: string;
  password: string;
};

type RootStackParamList = Record<string, Record<string, never>>;

function Login() {
  const toast = useToast();
  const userContext = useUserContext();

  // TODO: placeholder when empty
  // TODO: add proper error msg on failure
  // TODO: forgot password?

  const [isAuthenticationInProgress, setIsAuthenticationInProgress] =
    useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLogin = async (data: FormData) => {
    // navigation.navigate('MainNavigation', {});
    /** * For loading overlay purposes ** */
    setIsAuthenticationInProgress(true);
    try {
      const userId = await handleLogin(data.email, data.password);
      if (userId) {
        console.log("ASDLKSJDLASKJDL !!!!!!!!!")
        console.log("ASDLKSJDLASKJDL !!!!!!!!!")
        console.log("ASDLKSJDLASKJDL !!!!!!!!!")
        console.log("ASDLKSJDLASKJDL !!!!!!!!!")
        console.log(userId)
        await userContext.initUser(userId);
        navigation.navigate('MainNavigation', {});
      } else if (auth.currentUser?.email && !auth.currentUser?.emailVerified) {
        toast.show(
          "L'authentification a échoué..\nVeillez valider votre courriel",
          {
            type: 'warning',
            placement: 'top',
            duration: 8000,
            animationType: 'zoom-in',
            swipeEnabled: true,
          },
        );
      }
      setTimeout(() => {
        setIsAuthenticationInProgress(false);
      }, 10000);
    } catch (error) {
      auth.signOut();
      const message = error instanceof Error ? error.message : String(error);
      console.error({ message });
      toast.show("L'authentification a échoué..", {
        type: 'danger',
        placement: 'top',
        duration: 8000,
        animationType: 'zoom-in',
        swipeEnabled: true,
      });
      setIsAuthenticationInProgress(false);
    }
  };

  //   if (isAuthenticationInProgress) {
  //     return <LoadingOverlay message="merci de patienter.." />;
  //   }

  return (
    <View style={styles.container}>
      {/** ******* EMAIL ********* */}
      <Text style={styles.label}>courriel</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={textValue => onChange(textValue)}
            value={value}
          />
        )}
        name="email"
        rules={{ required: true }}
      />
      {errors.email && <Text style={styles.errorText}>Courriel requis</Text>}

      {/** ******* PASSWORD ********* */}
      <Text style={styles.label}>mot de passe</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={textValue => onChange(textValue)}
            value={value}
            secureTextEntry
          />
        )}
        name="password"
        rules={{ required: true }}
      />
      {errors.password && (
        <Text style={styles.errorText}>Mot de passe requis</Text>
      )}

      <View style={styles.buttonsContainer}>
        <ButtonText
          onPress={handleSubmit(onLogin)}
          textContent="connexion"
          btnHeight={60}
          btnWidth={300}
          padding={8}
          btnImgBackgroundColor={Colors.btnTextBackgroundColor}
          disabled={false}
        />

        <ButtonText
          onPress={() => {
            navigation.navigate('SignUp', {});
          }}
          textContent="créer un compte"
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

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#1B365D',
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
    borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  errorText: { color: '#fc5555' },
});
