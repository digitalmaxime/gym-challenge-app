import * as React from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as Controller from 'controller';
import { GripModel } from '../../../../models/grip/GripModel';
import { TextButton } from '../../../../components/basics/btn/TextButton';
import Colors from '../../../../constants/styles';


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
      setAllGrips((_) => allGrips);
    };
    
    getPinchGrips();
  }, []);
  
  function renderCrimpOptions(itemData: any) {
    const crimp = itemData.item as GripModel;
    return (
      <View>
        <TextButton 
        onPress={() => console.log("pressed")} 
        
        textContent={crimp.subGripType} 
        btnBackgroundColor={Colors.activeIcon} 
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
