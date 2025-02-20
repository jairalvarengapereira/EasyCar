import { Text } from "react-native";
import MyButton from "../../components/myButton/myButton";
import { styles } from "./ride.style.js";

export default function Ride(props) {
  return (<>
    <Text>Tela Ride</Text>
    <Text>Lista de passageiros</Text>
    <MyButton theme = 'red' text="Confirmar"></MyButton>
  </>
  );
};