import { Image, Text, View, FlatList, TouchableOpacity } from "react-native";
import MyButton from "../../components/myButton/myButton";
import { styles } from "./ride.style.js";
import { json_rides } from "../../constants/dados.js"
import icons from "../../constants/icons.js";

export default function Ride(props) {
  function clickRide(id){
    props.navigation.setParams({ride_id: id})  // passando o id da ride para a próxima tela
    props.navigation.navigate("rideDetail")
  }
  return <View style={styles.container}>
    <FlatList 
      data={json_rides} 
      keyExtractor={(ride) => ride.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return <TouchableOpacity style={styles.ride} onPress={() => clickRide( item.ride_id)} >
          
          <View style={styles.containerName}>
            <Image source={icons.car} style={styles.imgcar} ></Image>
            <Text style={styles.name}>{item.passenger_name}</Text>
          </View>

          <Text style={styles.address}>Origem: {item.pickup_address}</Text>
          <Text style={styles.address}>Destino: {item.dropoff_address}</Text>

        </TouchableOpacity>
      }}
    />

  </View>
};