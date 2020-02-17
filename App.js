import React from "react";
import Loading from "./Loading";
import * as Location from 'expo-location';
import { Alert } from "react-native";
import axios from 'axios';


//openWeather API KEY
const API_KEY = "9aeaf6a6ce9d3c42e466d60e87e52a3f";


export default class extends React.Component{
  state = {
    isLoading: true
  }
  getWeather = async(latitude,longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    console.log( data );
  } 
  geoLoaction = async() => {
    try{
      // throw Error();
      await Location.requestPermissionsAsync();
      const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync();
      // console.log(location);
      this.getWeather(latitude, longitude);
      this.setState({isLoading: false});
    }catch (error){
      Alert.alert("Can't find you", "so sad");
    }
  }
  componentDidMount(){
    this.geoLoaction();
  }
  render(){
    const {isLoading} = this.state;
    return isLoading ? <Loading/> : null;
  }
}


// export default function App() {
//   return <Loading />;
// }