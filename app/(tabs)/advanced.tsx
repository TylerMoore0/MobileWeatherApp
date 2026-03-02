import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { commonStyles } from '../../constants/mainstyles';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function AdvancedScreen() {
    const { windkph, winddir, pressuremb, visibilitykm, humidity, dewpointc, uvindex, error} = useLocalSearchParams();

  return (
     <SafeAreaView style={commonStyles.mainContainer}>
      <Stack.Screen
        options={{
          title: "Advanced"
        }}
      />
      <View style={commonStyles.mainDataContainer}>
        <View style={commonStyles.dataContainer}>
            {error && (
            <View style={commonStyles.errorContainer}>
                <Text style={commonStyles.dataLabel}>No Data</Text>
            </View>
            )}
            {!error && (
            <View>
            {/* not using label because react isnt letting me add text within the label. */}
                <Text style={commonStyles.dataLabel}>Wind speed: <Text style={commonStyles.dataText}>{windkph}km/h</Text></Text>
                <Text style={commonStyles.dataLabel}>Wind direction: <Text style={commonStyles.dataText}>{winddir}</Text></Text>
                <Text style={commonStyles.dataLabel}>Air pressure: <Text style={commonStyles.dataText}>{pressuremb}mb</Text></Text>
                <Text style={commonStyles.dataLabel}>Visibility: <Text style={commonStyles.dataText}>{visibilitykm}km</Text></Text>
                <Text style={commonStyles.dataLabel}>Humidity: <Text style={commonStyles.dataText}>{humidity}%</Text></Text>
                <Text style={commonStyles.dataLabel}>Dew point: <Text style={commonStyles.dataText}>{dewpointc}°</Text></Text>
                <Text style={commonStyles.dataLabel}>UV index(0 low | 10 High): <Text style={commonStyles.dataText}>{uvindex}</Text></Text>
            </View>
            )}
        </View>
      </View>
    </SafeAreaView>
  );
}



