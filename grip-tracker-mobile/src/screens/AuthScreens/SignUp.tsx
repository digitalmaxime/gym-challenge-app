import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { useForm, Controller, FieldValues } from "react-hook-form";
import Constants from "expo-constants";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import Colors from "../../constants/styles";
import { auth } from "../../utils/firebase";
import { handleSignUp, resendEmailVerification } from "../../utils/authHandler";
import { ButtonText } from "../../components/basics/btn/Buttons";
import { User } from "firebase/auth";

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

type RootStackParamList = Record<string, Record<string, never>>;

function SignUp() {
  const toast = useToast();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // TODO: add proper error msg on failure
  // TODO: min length etc : https://react-hook-form.com/ts#UseControllerProps
  // TODO: forgot password?

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [potentialUser, setPotentialUser] = useState<User>();

  useEffect(() => {
    if (!isEmailSent) return;

    toast.show("An email was sent!\nPlease take a look at your emails", {
      type: "success",
      placement: "top",
      duration: 8000,
      animationType: "slide-in",
      swipeEnabled: true,
    });
  }, [isEmailSent]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      confirmedPassword: "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      let user = await handleSignUp(data.email, data.password);
      setPotentialUser(user);
      setIsEmailSent(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error({ message });
      if (message.includes("email-already-in-use")) {
        toast.show("Email address already in use..", {
          type: "warning",
          placement: "top",
          duration: 5000,
          animationType: "zoom-in",
          swipeEnabled: true,
        });
      } else {
        toast.show("Account creation failed..", {
          type: "danger",
          placement: "top",
          duration: 8000,
          animationType: "zoom-in",
          swipeEnabled: true,
        });
      }
      await auth.signOut();
    } finally {
      setIsEmailSent(false);
    }
  };

  //   if (isAuthenticationInProgress) {
  //     return <LoadingOverlay message="merci de patienter.." />;
  //   }

  return (
    <View style={styles.container}>
      <View style={styles.InputFields}>
        {/** ******* EMAIL ********* */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: { value: EMAIL_REGEX, message: "invalid email" },
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                placeholder="email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
              {errors.email && (
                <Text style={styles.errorText}>
                  {error?.message || "Error"}
                </Text>
              )}
            </>
          )}
        />

        {/** ******* PASSWORD ********* */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
            minLength: { value: 6, message: "6 symbols minimum" },
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                placeholder="password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                style={styles.input}
              />

              {errors.password && (
                <Text style={styles.errorText}>
                  {error?.message || "Error"}
                </Text>
              )}
            </>
          )}
        />

        {/** ******* CONFIRM PASSWORD ********* */}
        <Controller
          name="confirmedPassword"
          rules={{
            required: true,
            validate: (value) =>
              value === getValues().password || "passwords don't match",
          }}
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                placeholder="confirm password"
                onBlur={onBlur}
                onChangeText={(val) => onChange(val)}
                value={value}
                secureTextEntry
                style={styles.input}
              />

              {errors.confirmedPassword && (
                <Text style={styles.errorText}>
                  {error?.message || "Error"}
                </Text>
              )}
            </>
          )}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <ButtonText
          onPress={handleSubmit(onSubmit)}
          textContent="create account"
          height={60}
          width={300}
          btnBackgroundColor={Colors.btnCheckBorderColor}
          disabled={false}
        />

        <ButtonText
          onPress={() => {
            reset();
            navigation.navigate("Login", {});
          }}
          textContent="back to login"
          height={60}
          width={300}
          padding={8}
          btnBackgroundColor={Colors.btnBackgroundColor}
          disabled={false}
        />

        <ButtonText
          onPress={() => {
            reset({
              email: "maxime.rheault@gmail.com",
              password: "12345678",
              confirmedPassword: "12345678",
            });

          }}
          textContent="reset ** DEV ONLY **"
          height={60}
          width={300}
          padding={8}
          btnBackgroundColor={Colors.transparent}
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
    justifyContent: "center",
    padding: 8,
  },
  InputFields: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "stretch",
  },
  buttonsContainer: {
    padding: 20,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  errorText: { color: "#fc5555" },
  errorOutline: {
    borderWidth: 3,
    borderRadius: 4,
  },
});
