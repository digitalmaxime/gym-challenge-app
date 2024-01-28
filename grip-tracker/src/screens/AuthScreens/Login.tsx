import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useForm,
  Controller,
  FieldValues,
} from "react-hook-form";
import Constants from "expo-constants";
import { StackNavigationProp } from "@react-navigation/stack";
import { useToast } from "react-native-toast-notifications";
import { useUserContext } from "../../contexts/UserContext";
import { handleLogin } from "../../utils/auth";
import { auth } from "../../utils/firebase";
import { ButtonText } from "../../components/basics/Buttons";
import Colors from "../../constants/styles";

type RootStackParamList = Record<string, Record<string, never>>;

function Login() {
  const toast = useToast();
  const userContext = useUserContext();

  // TODO: add proper error msg on failure 
  // TODO: min length etc : https://react-hook-form.com/ts#UseControllerProps
  // TODO: forgot password?

  const [isAuthenticationInProgress, setIsAuthenticationInProgress] = useState(false);
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
        await userContext.initUser(userId);
        // navigation.navigate('MainNavigation', {});
      } else if (auth.currentUser?.email && !auth.currentUser?.emailVerified) {
        toast.show(
          "Authentication failed..\nVerify your email",
          {
            type: "warning",
            placement: "top",
            duration: 8000,
            animationType: "zoom-in",
            swipeEnabled: true,
          }
        );
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

  //   if (isAuthenticationInProgress) {
  //     return <LoadingOverlay message="merci de patienter.." />;
  //   }

  return (
    <View style={styles.container}>

      {/********* Header *********/}
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../../../assets/Nikita-icon.png")}
        />
      </View>

      <View style={styles.InputFields}>
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
        {errors.email && <Text style={styles.errorText}>email is required.</Text>}

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

      <View style={styles.buttonsContainer}>
        <ButtonText
          onPress={handleSubmit(onLogin)}
          textContent="login"
          height={60}
          width={300}
          btnBackgroundColor={Colors.textBackGroundColor}
          disabled={false}
        />

        <ButtonText
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
        <ButtonText
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
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingTop: Constants.statusBarHeight,
    padding: 10,
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  logo: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "yellow",
    width: 100,
    height: 80,
    padding: 0,
    margin: 0,
  },
  InputFields: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "stretch"
  },
  buttonsContainer: {
    margin: 10,
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  errorText: { color: "#fc5555" },
});
