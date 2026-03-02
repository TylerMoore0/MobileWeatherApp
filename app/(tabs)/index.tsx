import { Image } from 'expo-image';
import { Text, TouchableOpacity, View, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';

import { commonStyles, homeStyles } from '../../constants/mainstyles';
import { Stack, router } from 'expo-router';
import { Label } from '@react-navigation/elements';

export default function HomeScreen() {
  const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

  const [weather, setWeather] = useState(Object);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputLocation, setInputLocation] = useState("")
  const [location, setLocation] = useState("Canada");

  function validationLocation(){
    if(inputLocation.length > 0) {
      setLocation(inputLocation);
    } else {
      setError("Enter a location.");
    }
  }
  async function loadWeather() {
    // We need to reset our variables for the next load.
    setLoading(true);
    setError(null);

    try {
      //Fetch the weather. 
      const res = await fetch(`http://api.weatherapi.com/v1/current.json?q=${location}&key=${API_KEY}`);
      const data = await res.json();

      /* If theres an error for 400s we can use the built in error message system of the API. 
       * If its something else display my custom http error message.
       * If no error set the weather data object.*/
      if(data.error?.code) {
        throw new Error(data.error?.message);
      } else if(!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      } else {
        setWeather(data)
      }
    } catch(e) {
      // Assert e so react knows this is an error.
      if (e instanceof Error) {
        setError(e.message ?? "Unknown error");
      }
      setWeather([]);
    } finally {
      // Always set loading to false once done.
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWeather();
  }, [location])

  return (
    <SafeAreaView style={commonStyles.mainContainer}>
      <Stack.Screen
        options={{
           headerLeft: () => (
            <TouchableOpacity
              style={commonStyles.headerButton}
              onPress={() => router.replace('/')}
            ><Text>Home</Text></TouchableOpacity>
          ),
          headerTitle: () => (
            <TouchableOpacity
              style={commonStyles.headerButton}
              onPress={() => router.push({
                pathname: '/conditions', 
                params: { windkph: weather.current?.wind_kph, tempc: weather.current?.temp_c, precipmm: weather.current?.precip_mm, 
                  visibilitykm: weather.current?.vis_km, uvIndex: weather.current?.uv, error: error}})}
            ><Text>Conditions</Text></TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={commonStyles.headerButton}
              onPress={() => router.push({
                pathname: '/advanced', 
                params: { windkph: weather.current?.wind_kph, winddir: weather.current?.wind_dir, pressuremb: weather.current?.pressure_mb, error: error,
                  visibilitykm: weather.current?.vis_km, humidity: weather.current?.humidity, dewpointc: weather.current?.dewpoint_c, uvindex: weather.current?.uv}}
              )}
            ><Text>Advanced</Text></TouchableOpacity>
          ),
        }}
      />
      <View style={commonStyles.mainDataContainer}>
        <View style={homeStyles.searchLocationContainer}>
          <Label style={commonStyles.label}>Set Location: </Label>
          <TextInput
              style={commonStyles.input}
              placeholder="Enter Location"
              onChangeText={setInputLocation}
            />
          <TouchableOpacity onPress={() => validationLocation()} style={commonStyles.button}>
            <Text>Go</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={homeStyles.activityIndicatorContainer}>
              <ActivityIndicator size="large"/>
                  <Text style={homeStyles.activityIndicatorText}>Loading...</Text>
          </View>
        )}

        {!loading && error && (
          <View style={commonStyles.errorContainer}>
              <Text>Error</Text>
              <Text>{error}</Text>
          </View>
        )}

        {!loading && !error && Object.keys(weather).length === 0 && (
          <View style={commonStyles.notFoundContainer}>
              <Text>No Weather data.</Text>
          </View>
        )}

        {!loading && !error && Object.keys(weather).length > 0 && (
          <View>
            <View style={homeStyles.imageContainer}>
              {weather.current?.condition?.icon && (
                <Image
                  source={{ uri: `https:${weather.current.condition.icon}` }}
                  style={homeStyles.image}
                />
              )}
            </View>
            <View style={commonStyles.dataContainer}>
              {/* not using label because react isnt letting me add text within the label. */}
              <Text style={commonStyles.dataLabel}>Location: <Text style={commonStyles.dataText}>{weather.location?.name}, {weather.location?.region}</Text></Text>
              <Text style={commonStyles.dataLabel}>Last Updated: <Text style={commonStyles.dataText}>{weather.current?.last_updated}</Text></Text>
              <Text style={commonStyles.dataLabel}>Tempurature(°C): <Text style={commonStyles.dataText}>{weather.current?.temp_c} °C</Text></Text>
              <Text style={commonStyles.dataLabel}>Tempurature(°F): <Text style={commonStyles.dataText}>{weather.current?.temp_f} °F</Text></Text>
              <Text style={commonStyles.dataLabel}>Overall condition: <Text style={commonStyles.dataText}>{weather.current?.condition?.text}</Text></Text>
            </View>
        </View>
        )}
      </View>
    </SafeAreaView>
  );
}

