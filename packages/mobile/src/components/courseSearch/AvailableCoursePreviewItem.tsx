/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable global-require */
/* eslint-disable max-len */
/* eslint-disable no-return-await */
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Card } from 'react-native-paper';
import { CacheManager } from 'react-native-expo-image-cache';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useToast } from 'react-native-toast-notifications';
import Colors from '../../constants/styles';
import { useCoursesContext } from '../../contexts/CoursesContext';
import { ButtonIcon } from '../basics/Buttons';
import CoursePreview from '../../models/course/CoursePreview';
import PasswordModal from '../basics/PasswordModal';
import * as Controller from '../../controller/controller';
import LoadingOverlay from '../basics/LoadingOverlay';

type RootStackParamList = {
  CourseDetailsScreen: { coursePreview: CoursePreview };
  CourseLearning: Record<string, never>;
};

interface CourseIconItemProps {
  coursePreview: CoursePreview;
}
function AvailableCoursePreviewItem({ coursePreview }: CourseIconItemProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const toast = useToast();
  const coursesContext = useCoursesContext();
  const isCourseAlreadyFollowed = coursesContext.followedCoursesPreview.findIndex((c) => c.id === coursePreview.id) >= 0;
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [cachedImageUri, setCachedImageUri] = useState<string>();
  const [isAddCourseLocked, setIsAddCourseLocked] = useState<boolean>(false);

  useEffect(() => {
    const getCachedImage = async () => {
      const path = await CacheManager.get(coursePreview.imageUrl, {}).getPath();
      if (path) {
        const cachedImg = await FileSystem.getInfoAsync(path);
        if (cachedImg && cachedImg.exists) {
          setCachedImageUri(cachedImg.uri);
        }
      }
    };

    getCachedImage();
  }, []);

  async function controlAccessToCourse() {
    if (isCourseAlreadyFollowed) {
      await coursesContext.selectCourse(coursePreview.id);
      navigation.navigate('CourseLearning', {});
      return;
    }

    if (coursePreview.hasPassword) {
      setShowPasswordModal(true);
    } else {
      handlerAddCourseToFollowedCourses('');
    }
  }

  async function handlerAddCourseToFollowedCourses(password: string) {
    setIsAddCourseLocked(true);
    try {
      await Controller.followCourse(coursePreview.id, password);
      coursesContext.addCourseToFollowedCourses(coursePreview);
      await coursesContext.selectCourse(coursePreview.id);

      toast.show('Cours ajouté à votre liste', {
        type: 'success',
        placement: 'top',
        duration: 2000,
        animationType: 'zoom-in',
        swipeEnabled: true,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error({ message });
      toast.show('L\'authentification a échoué..', {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        animationType: 'zoom-in',
        swipeEnabled: true,
      });
    } finally {
      setIsAddCourseLocked(false);
      setShowPasswordModal(false);
    }
  }

  return (
    <View>
      {(coursePreview.hasPassword) && (
        <View style={styles.lockedIcon}>
          <ButtonIcon
            onPress={() => {}}
            iconName="lock"
            iconSize={40}
            btnSize={40}
            btnBackgroundColor={Colors.transparent}
            color={Colors.topNavBarColor}
            disabled
          />
        </View>
      )}
      <View style={styles.cardContainer}>
        <Card elevation={6} style={styles.card}>
          <TouchableOpacity
            onPress={controlAccessToCourse}
          >
            <Card.Title
              title={coursePreview.courseNumber}
              titleStyle={styles.title}
              subtitle={coursePreview.courseTitle}
              subtitleStyle={styles.detailText}
            />

            {!cachedImageUri && (
            <Image
              source={require('../../../assets/images/blurry2.jpeg')}
              style={{
                height: 64, width: 130, resizeMode: 'contain',
              }}
            />
            )}
            {cachedImageUri && (
            <Image
              source={{ uri: coursePreview.imageUrl, cache: 'force-cache' }}
              style={{ height: 64, width: 130 }}
            />
            )}

          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <ButtonIcon
              onPress={() => {
                navigation.navigate('CourseDetailsScreen', { coursePreview });
              }}
              iconName="information"
              iconSize={20}
              btnSize={30}
              color={Colors.activeIcon}
              btnBackgroundColor={Colors.mediumOpacity}
              disabled={false}
            />
            {!isCourseAlreadyFollowed && (
            <ButtonIcon
              onPress={controlAccessToCourse}
              iconName="plus"
              iconSize={20}
              btnSize={30}
              color={Colors.activeIcon}
              btnBackgroundColor={Colors.mediumOpacity}
              disabled={isAddCourseLocked}
            />
            )}
            {isCourseAlreadyFollowed && (
            <Text style={{
              color: Colors.textColor, alignSelf: 'center', fontStyle: 'italic',
            }}
            >
              Suivi
            </Text>
            )}
          </View>
        </Card>
      </View>
      {showPasswordModal && (
        <PasswordModal
          message="Entrez le mot de passe"
          confirm={handlerAddCourseToFollowedCourses}
          cancel={() => setShowPasswordModal(false)}
        />
      )}
      {isAddCourseLocked && (
        <LoadingOverlay message="" />
      )}
    </View>
  );
}

export default AvailableCoursePreviewItem;

const styles = StyleSheet.create({
  cardContainer: { margin: 10 },
  card: {
    backgroundColor: Colors.cardBackgroundColor,
    margin: 4,
    width: 130,
    height: 180,
    padding: 0,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    margin: 0,
    color: 'white',
  },
  detailText: {
    fontSize: 10,
    color: 'white',
  },
  image: { height: 64 },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
    margin: 0,
  },
  lockedIcon: {
    position: 'absolute',
    zIndex: 2,
    top: -2,
    left: -5,
  },
});
