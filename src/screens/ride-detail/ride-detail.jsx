import { Text, View, TextInput } from "react-native";
import { styles } from "./ride-detail.style.js";
import MapView, { Marker, PROVIDER_DEFAULT} from'react-native-maps';
import MyButton from "../../components/myButton/myButton";
import { useState } from "react";
import icons from "../../constants/icons.js";

export default function RideDetail(props) {

  const [myLocation, setMyLocation] = useState({
    latitude: 20,
    longitude: 20
  })

  return <View style={styles.container}>
    <MapView 
      style={styles.map}
      provider={PROVIDER_DEFAULT}
      initialRegion = {{
        latitude: -19.832109,
        longitude: -43.910670,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      }}
    >
      <Marker
        coordinate={{
          latitude: -19.832109,
          longitude: -43.910670
        }}
        title="Jair Alvarenga Pereira"
        description="R. Coronel Braga Junior, 18 - Lajedo"
        image={icons.location}
        style={styles.marker}
      />

    </MapView>

    <View style={styles.footer}>
      <View style={styles.footerText}>
        <Text>Encontre sua carona</Text>
      </View>

      <View style={styles.footerFileds}>
        <Text>Origem</Text>
        <TextInput style={styles.input}></TextInput>
      </View>

      <View style={styles.footerFileds}>
        <Text>Destino</Text>
        <TextInput style={styles.input}></TextInput>
      </View>
    </View>

    <MyButton text="Aceitar"></MyButton>
  </View>
};