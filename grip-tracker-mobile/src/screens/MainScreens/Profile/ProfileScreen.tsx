import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import Colors from '../../../constants/styles'
import { useUserContext } from '../../../contexts/UserContext';
import { auth } from '../../../utils/firebase';
import { TextButton } from '../../../components/basics/btn/TextButton';
import WarningModal from '../../../components/basics/warnings/WarningModal';
import { handlerCurrentDeleteUser } from '../../../utils/authHandler';
import Header from '../../../components/header/Header';

function ProfileScreen() {
  const userContext = useUserContext();
  const toast = useToast();

  const [showWarning, setShowWarning] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      
      {/********* Header *********/}
      <Header></Header>
      
      <Text style={styles.title}>Profile</Text>
      <View>
        <Text style={styles.text}>{userContext.userData?.email || 'userData.email not found..'}</Text>
      </View>
      <View style={styles.bottomBtnContainer}>
        <TextButton
          onPress={async () => {
            try {
              // await deleteCache();
              toast.show('cache cleared', {
                type: 'success',
                placement: 'top',
                duration: 2000,
                animationType: 'zoom-in',
                swipeEnabled: true,
              });
            } catch (error) {
              const message = (error instanceof Error) ? error.message : String(error);
              console.error({ message });
              toast.show('unable to clear cache', {
                type: 'warning',
                placement: 'top',
                duration: 2000,
                animationType: 'zoom-in',
                swipeEnabled: true,
              });
            }
          }}
          textContent="clear cache"
          disabled={false}
          padding={8}
        />
        <TextButton
          onPress={async () => {
            await auth.signOut();
            userContext.reset();
          }}
          textContent="logout"
          disabled={false}
          padding={8}
        />
        <TextButton
          onPress={async () => {
            setShowWarning(true);
          }}
          textContent="delete account"
          btnBackgroundColor={Colors.cancel}
          disabled={false}
          padding={8} 
        />
      </View>

      {showWarning && (
      <WarningModal
        message="Do you really want to delete your account?"
        confirm={async () => {
          setShowWarning(!showWarning);
          await handlerCurrentDeleteUser();
        }}
        cancel={() => {
          setShowWarning(!showWarning);
        }}
      />
      )}

    </View>

  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    // backgroundColor: 'blue',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textColor,
    marginTop: 10,
    marginLeft: 10,
    flexShrink: 1,
  },
  text: {
    fontSize: 18,
    color: Colors.textColor,
  },
  bottomBtnContainer: {
    flexGrow: 1,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
