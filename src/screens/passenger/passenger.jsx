import { Text, View, TextInput, ActivityIndicator } from "react-native";
import { styles } from "./passenger.style.js";
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import MyButton from "../../components/myButton/myButton";
import { useEffect, useState } from "react";
import icons from "../../constants/icons.js";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, reverseGeocodeAsync } from "expo-location";

export default function Passenger(props) {

  const [myLocation, setMyLocation] = useState({})
  const [title, setTitle] = useState("")
  const [nameUser, setNameUser] = useState("")
  const [pickupAddress, setPickupAddress] = useState("")
  const [dropoffAddress, setDropoffAddress] = useState("")

  async function RequestRideFromUser() {
    // Acessar dados da API
    const response = {}
    return response;
  }

  async function RequestPermissionAndGetLocation() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      if (currentPosition.coords)
        return currentPosition.coords;
      else
        throw new Error("Não foi possível acessar sua localização.");
    } else {
      throw new Error("Permissão negada pelo usuário.");
    }
  }

  async function loadScreen() {
    const response = await RequestRideFromUser();

    if (!response.ride_id) {
      // latitude e longitude de qualquer ponto do país
      // const location = { latitude: -23.5489, longitude: -46.6388 }; // Rio de Janeiro
      // const location = { latitude: 37.7749, longitude: -122.4194 }; // San Francisco
      // const location = { latitude: 40.7128, longitude: -74.0060 }; // New York City
      // const location = { latitude: 35.6895, longitude: 139.6917 }; // Tokyo
      // const location = { latitude: 31.1527, longitude: 121.4737 }; // Shanghai
      // const location = { latitude: 25.1951, longitude: 55.2796 }; // Dubai

      // const location = { latitude: 35.6895, longitude: 139.6917 }
      const location = await RequestPermissionAndGetLocation();

      if (location.latitude) {
        setTitle("Encontre a sua carona agora");
        setMyLocation(location);
        RequestAddressName(location.latitude, location.longitude);

      } else {
        throw new Error("Não foi possível encontrar a sua localização.");
      }

    } else {
      setTitle("Sua carona foi encontrada!");
    }
  }

  async function RequestAddressName(lat, long) {
    try {
      const response = await reverseGeocodeAsync({
        latitude: lat, 
        longitude: long
      });
  
      if (response.length > 0 && response[0].street && response[0].streetNumber && response[0].district) {
        setPickupAddress(response[0].street + ", " + 
                         response[0].streetNumber + " - " + 
                         response[0].district);
      } else {
        throw new Error("Endereço de origem não encontrado.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadScreen();
  }, [])

  return (
    <View style={styles.container}>
      {myLocation.latitude ? (
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            initialRegion={{
              latitude: myLocation.latitude,
              longitude: myLocation.longitude,
              latitudeDelta: 0.004,
              longitudeDelta: 0.004,
            }}
          >
            <Marker
              coordinate={{
                latitude: myLocation.latitude,
                longitude: myLocation.longitude
              }}
              title = "Jair Alvarenga Pereira"
              description = {pickupAddress}
              image={icons.location}
              style={styles.marker}
            />
          </MapView>
          <View style={styles.footer}>

            <View style={styles.footerText}>
              <Text>{title}</Text>
            </View>

            <View style={styles.footerFileds}>
              <Text>Origem</Text>
              <TextInput style={styles.input} value={pickupAddress}></TextInput>
            </View>

            <View style={styles.footerFileds}>
              <Text>Destino</Text>
              <TextInput style={styles.input} ></TextInput>
            </View>

          </View>
          <MyButton theme='default' text="Confirmar"></MyButton>
        </>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}
