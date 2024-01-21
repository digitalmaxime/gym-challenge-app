import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Colors from '../../../../constants/styles';
import * as Controller from '../../../../controller/controller';
import { GripModel } from '../../../../models/grip/GripModel';
import styles from '../../../../constants/styles';
import { ButtonText } from '../../../../components/basics/Buttons';


export interface CrimpSelectionProps {}

type RootStackParamList = {
  CrimpChallenge: GripModel;
};

export function CrimpSelectionScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [allGrips, setAllGrips] = React.useState<any[]>([]);

  React.useEffect(() => {
    const getPinchGrips = async () => {
      const allGrips = (await Controller.getFilteredGrips("crimp")).data as any[];
      console.log(allGrips);
      setAllGrips((_) => allGrips);
    };
    
    getPinchGrips();
  }, []);
  
  function renderCrimpOptions(itemData: any) {
    const crimp = itemData.item as GripModel;
    return (
      <View>
        <ButtonText 
        onPress={() => console.log("pressed")} 
        
        textContent={crimp.subGripType} 
        btnHeight={100} 
        btnWidth={300} 
        btnImgBackgroundColor={Colors.activeIcon} 
        padding={0} 
        disabled={false}        
        />
      </View>
    );
  }

  return (
    <View>
      <Text>CrimpSelection</Text>
      <FlatList
        data={allGrips}
        keyExtractor={item => item.id}
        numColumns={1}
        bounces={false}
        renderItem={renderCrimpOptions}
      />
    </View>
  );
}
