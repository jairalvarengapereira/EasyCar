import { ImageBackground, Image, Text, TouchableOpacity, Alert } from "react-native";
import icons from "../../constants/icons";
import { styles } from "./home.style.js";

function Home(props){

  function openPessenger(){
    props.navigation.navigate("passenger")
  }
  
  function openRide(){
    props.navigation.navigate("ride")
  }

  return <ImageBackground 
    source={icons.bg} 
    resizeMode="cover" 
    style={styles.bg}>

    <Image source={icons.logo} style={styles.logo}></Image>

    <TouchableOpacity style={styles.btn} onPress={openPessenger}>
      <Image source={icons.passenger} style={styles.img} />
      <Text style={styles.title}>Passageiro</Text>
      <Text style={styles.text}>Encntre uma carona pra você</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.btn} onPress={openRide}>
      <Image source={icons.driver} style={styles.img} />
      <Text style={styles.title}>Motorista</Text>
      <Text style={styles.text}>Ofereça carona em seu carro</Text>
    </TouchableOpacity>
    
    
  </ImageBackground>
}
export default Home;