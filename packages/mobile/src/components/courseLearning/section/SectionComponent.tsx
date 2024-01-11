/* eslint-disable max-len */
/* eslint-disable global-require */
import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Image, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../constants/styles';
import Section from '../../../models/course/section/Section';
import Unit from '../../../models/course/unit/Unit';

import { ButtonIcon } from '../../basics/Buttons';
import UnitComponent from '../unit/UnitComponent';

const SectionIconNames = new Map();
SectionIconNames.set(0, 'lighthouse');
// SectionIconNames.set(0, 'flag-triangle');
SectionIconNames.set(1, 'summit');
SectionIconNames.set(2, 'castle');
SectionIconNames.set(3, 'death-star-variant');
SectionIconNames.set(4, 'unicorn-variant');
SectionIconNames.set(5, 'unicorn-variant');
SectionIconNames.set(6, 'unicorn-variant');
SectionIconNames.set(7, 'unicorn-variant');
// SectionIconNames.set(0, 'duck');
// SectionIconNames.set(0, 'ghost');
// SectionIconNames.set(1, 'jellyfish');
// SectionIconNames.set(2, 'mushroom');
// SectionIconNames.set(0, 'penguin');
// SectionIconNames.set(1, 'rabbit');
// SectionIconNames.set(2, 'snail');

interface SectionProps {
  section: Section;
  index: number;
}

function SectionComponent({ section, index }: SectionProps) {
  function renderUnitItem(itemData: any) {
    const unit: Unit = itemData.item;
    return (
      <View style={styles.unitsContainer}>
        <UnitComponent
          unit={unit}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.sectionIcon}>
          <ButtonIcon
            onPress={() => console.log('pressed beehive :)')}
            iconName={SectionIconNames.get(index)}
            iconSize={45}
            btnSize={45}
            btnBackgroundColor={Colors.transparent}
            color={Colors.sectionIconColor}
            disabled={false}
          />
        </View>
        <Image
          style={styles.bannerImage}
          source={require('../../../../assets/images/golden-banner.png')}
        />
        <Text style={styles.sectionTitle}>
          {section.name.length > 19 ? `${section.name.substring(0, 17)}..` : section.name}
        </Text>

        {(
          section.controlPoint
          // && sectionProgress?.isCompleted === false
        ) && (
          <View style={styles.sectionIconLock}>
            <MaterialCommunityIcons
              style={{ alignSelf: 'center' }}
              name="lock"
              size={38}
              color={Colors.lockIconColor}
            />
          </View>
        )}

      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <FlatList
          data={section.units}
          keyExtractor={item => item.id}
          renderItem={renderUnitItem}
        />
      </View>
    </View>
  );
}

export default SectionComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 34,
    marginBottom: 10,
  },
  sectionIcon: { bottom: 46 },
  sectionTitle: {
    position: 'absolute',
    width: 200,
    top: 12,
    fontSize: 20,
    color: Colors.sectionTitleColor,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'AvenirNext-DemiBold',
    textAlign: 'center',
  },
  bannerImage: {
    position: 'absolute',
    width: 300,
    height: 58,
  },
  sectionIconLock: {
    zIndex: 2,
    position: 'absolute',
    left: 99,
    top: 13,
  },
  unitsContainer: {
    marginBottom: 38,
    alignItems: 'center',
  },
});
