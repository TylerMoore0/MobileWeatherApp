import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';

import { commonStyles, conditionStyles } from '../../constants/mainstyles';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Label } from '@react-navigation/elements';

export default function CondtionsScreen() {
  const { windkph, tempc, precipmm, visibilitykm, uvIndex, error } = useLocalSearchParams();
  // Cast back to floats since useLocalSearchParams casts params to strings.
  const windKphNum = Number(windkph);
  const tempCNum = Number(tempc);
  const precipMmNum = Number(precipmm);
  const visibilityKmNum = Number(visibilitykm);
  const uvIndexNum = Number(uvIndex);
  const [driving, setDriving] = useState("No Data");
  const [running, setRunning] = useState("No Data");

  function calculateDriving(){
    let weight = 0;
    let condition = "";
    if (windKphNum >= 50.0) weight++;
    if (tempCNum <= -10.0 || tempCNum >= 35.0) weight++;
    if (precipMmNum >= 8.0) weight++;
    if (visibilityKmNum <= 5.0) weight++;

    switch(weight){
      case 1:
      condition = "Great";
      break;
      case 2:
      condition = "Good";
      break;
      case 3:
      condition = "Decent";
      break;
      case 4:
      condition = "Poor";
      break;
      default:
      condition = "Perfect";
    }
    setDriving(condition);
  }

  function calculateRunning(){
    let weight = 0;
    let condition = "";
    if (windKphNum >= 35.0) weight++;
    if (tempCNum < 0.0 || tempCNum > 30.0) weight++;
    if (precipMmNum >= 5.0) weight++;
    if (uvIndexNum >= 8.0) weight++;

    switch(weight){
      case 1:
      condition = "Great";
      break;
      case 2:
      condition = "Good";
      break;
      case 3:
      condition = "Decent";
      break;
      case 4:
      condition = "Poor";
      break;
      default:
      condition = "Perfect";
    }
    setRunning(condition);
  }

  useEffect(() => {
    if(!error) {
      calculateDriving();
      calculateRunning();
    }
  }, [])

  return (
     <SafeAreaView style={commonStyles.mainContainer}>
      <Stack.Screen
        options={{
          title: "Conditions"
        }}
      />
      <View style={commonStyles.mainDataContainer}>
        <View style={commonStyles.dataContainer}>
          <Label style={conditionStyles.mainLabel}>Driving Conditions</Label>
          <Label style={conditionStyles.subLabel}>{driving}</Label>
        </View>
        <View style={commonStyles.dataContainer}>
          <Label style={conditionStyles.mainLabel}>Running Conditions</Label>
          <Label style={conditionStyles.subLabel}>{running}</Label>
        </View>
      </View>
    </SafeAreaView>
  );
}

