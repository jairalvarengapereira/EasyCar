import { TouchableOpacity, Text } from "react-native";
import { styles } from "./myButton.style.js";

export default function MyButton(props){
  return <TouchableOpacity style={props.theme == 'red' ? styles.btnRed : styles.btnYellow}>
    <Text style={props.theme == 'red'? styles.textLigth : styles.textDark}>{props.text}</Text>
  </TouchableOpacity>
}