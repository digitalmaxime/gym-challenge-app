import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import Colors from '../../../constants/styles'
import { useUserContext } from '../../../contexts/UserContext';
import * as Controller from '../../../api/controller';
import { ButtonText } from '../../../components/basics/Buttons';
import WarningModal from '../../../components/basics/WarningModal';
import { auth } from '../../../utils/firebase';

function ProfileScreen() {
  const userContext = useUserContext();
  const toast = useToast();

  const [showWarning, setShowWarning] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.row}>
        <Text style={styles.text}>{userContext.userData.email}</Text>
      </View>
      <View style={styles.bottomBtnContainer}>
        <ButtonText
          onPress={async () => {
            try {
              // await deleteCache();
              toast.show('La cache a été vidé', {
                type: 'success',
                placement: 'top',
                duration: 2000,
                animationType: 'zoom-in',
                swipeEnabled: true,
              });
            } catch (error) {
              const message = (error instanceof Error) ? error.message : String(error);
              console.error({ message });
              toast.show('La cache n\'a pas pu être vidé', {
                type: 'warning',
                placement: 'top',
                duration: 2000,
                animationType: 'zoom-in',
                swipeEnabled: true,
              });
            }
          }}
          textContent="effacer la cache"
          disabled={false}
          padding={8}
        />
        <ButtonText
          onPress={async () => {
            await auth.signOut();
            userContext.reset();
            console.log('sign out');
          }}
          textContent="se déconnecter"
          disabled={false}
          padding={8}
        />
        <ButtonText
          onPress={async () => {
            setShowWarning(true);
          }}
          textContent="supprimer le compte"
          btnBackgroundColor={Colors.cancel2}
          disabled={false}
          padding={8}
        />
      </View>
      {showWarning && (
      <WarningModal
        message="Voulez-vous vraiment supprimer votre compte?"
        confirm={async () => {
          Controller.deleteUser(1);
          await auth.signOut();
          setShowWarning(!showWarning);
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
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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
  row: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
    flexShrink: 1,
  },
  bottomBtnContainer: {
    flexGrow: 1,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
