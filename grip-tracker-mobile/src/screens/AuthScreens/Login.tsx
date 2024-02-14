import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller, FieldValues } from "react-hook-form";
import Constants from "expo-constants";
import { StackNavigationProp } from "@react-navigation/stack";
import { useToast } from "react-native-toast-notifications";
import { useUserContext } from "../../contexts/UserContext";
import { handleLogin } from "../../utils/authHandler";
import { auth } from "../../utils/firebase";
import { TextButton } from "../../components/basics/btn/TextButton";
import Colors from "../../constants/styles";
import Header from "../../components/header/Header";
import { useChallengeContext } from "../../contexts/ChallengeContext";

type RootStackParamList = Record<string, Record<string, never>>;

export default function Login() {
  const toast = useToast();
  const userContext = useUserContext();
  const challengesContext = useChallengeContext();

  // TODO: add proper error msg on failure
  // TODO: min length etc : https://react-hook-form.com/ts#UseControllerProps
  // TODO: forgot password?

  const [isAuthenticationInProgress, setIsAuthenticationInProgress] =
    useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = async (data: FieldValues) => {
    // navigation.navigate('MainNavigation', {});

    /** * For loading overlay purposes ** */
    setIsAuthenticationInProgress(true);
    try {
      const userId = await handleLogin(data.email, data.password);
      if (userId) {
        console.log("--> LOGIN : after handleLogin()");
        await userContext.initUser();
        await challengesContext.init();
      } else if (auth.currentUser?.email && !auth.currentUser?.emailVerified) {
        toast.show("Authentication failed..\nVerify your email", {
          type: "warning",
          placement: "top",
          duration: 8000,
          animationType: "zoom-in",
          swipeEnabled: true,
        });
      }
      setTimeout(() => {
        setIsAuthenticationInProgress(false);
      }, 10000);
    } catch (error) {
      auth.signOut();
      const message = error instanceof Error ? error.message : String(error);
      console.error({ message });
      toast.show("Authentication failed..", {
        type: "danger",
        placement: "top",
        duration: 8000,
        animationType: "zoom-in",
        swipeEnabled: true,
      });
      setIsAuthenticationInProgress(false);
    }
  };

  // if (isAuthenticationInProgress) {
  //   return <LoadingOverlay message="merci de patienter.." />;
  // }

  return (
    <View style={styles.container}>
      {/********* Header *********/}
      <Header></Header>

      <View style={styles.contentContainer}>

        <View style={styles.InputFieldsContainer}>
          {/********* EMAIL *********/}
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>email is required.</Text>
          )}

          {/** ******* PASSWORD ********* */}
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                style={styles.input}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>password is required</Text>
          )}
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TextButton
            onPress={handleSubmit(onLogin)}
            textContent="login"
            height={60}
            width={300}
            btnBackgroundColor={Colors.textBackGroundColor}
            disabled={false}
          />

          <TextButton
            onPress={() => {
              navigation.navigate("SignUp", {});
            }}
            textContent="create account"
            textColor={Colors.textColor}
            height={60}
            width={300}
            btnBackgroundColor={Colors.textBackGroundColor}
            disabled={false}
          />

          <TextButton
            onPress={() => {
              reset({
                email: "maxime.rheault@gmail.com",
                password: "12345678",
              });
            }}
            textContent="reset ** DEV ONLY **"
            textColor="#FFF"
            height={60}
            width={300}
            btnBackgroundColor={Colors.transparent}
            disabled={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "space-evenly",
    padding: 0,
    margin: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: '100%',
    // backgroundColor: 'blue',
  },
  InputFieldsContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    // backgroundColor: "yellow",
    width: '100%',
    padding: 10,
  },
  input: {
    backgroundColor: "white",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  errorText: { color: "#fc5555" },
});
