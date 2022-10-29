import React, { useEffect, useState,useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import {Appbar,Avatar, Button, Colors,FAB} from 'react-native-paper';
import MapView,{Marker, Polyline} from 'react-native-maps';
import PolylineMaker from '../services/PolyLineMaker';
import * as Location from 'expo-location'

const blueCar = require('../../assets/standar-car.png')
const proCar = require('../../assets/pro.png')
const locationIcon = require('../../assets/location.png')

const DriverJourney = ({from, to,carType}) => {
    const[myLocation,setLocation] = useState({latitude: -34.586992,longitude: -60.949984})
    const[route,setRoute] = useState()
    const[arrived,setInplace] = useState(false)
    const[pro,setPro] = useState(true)
    const mapRef = React.createRef();
    const[desde,setDesde] = useState(myLocation)
    const[hasta,setHasta] = useState(myLocation)

    useEffect(() => {
      getLocationPermission();
    },[])

    async function getLocationPermission() {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied')
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        enableHighAccuracy: true,
        timeInterval: 5
      });
      setLocation({latitude:location.coords.latitude,longitude: location.coords.longitude});
    }


    const  goToPassenger = () => {

      let lanLong = `${myLocation.latitude}, ${myLocation.longitude}`
      PolylineMaker(lanLong,'Chacabuco, Buenos Aires, Argentina')
      .then(
        result => {
          let end = result[result.length-1]
          setRoute(result)
          setDesde(myLocation)
          setHasta(end)
          setInplace(true)
        }
        )
      .catch(
        err => setRoute(err)
      )
    }

    const startJourney = () => {
      PolylineMaker('Chacabuco, Buenos Aires, Argentina','Junín, Buenos Aires, Argentina')
      .then(
        result => {
          let start = result[0]
          let end = result[result.length -1 ]
          setRoute(result)
          setDesde(start)
          setHasta(end)
          }
      )
      .catch(
        err => setRoute(err)
      )
    }

    function car() {
      if(pro) {
        return proCar
      }
      return blueCar
    }

    const goToMyLocation = async () => {
      console.log('Pressed!')
      mapRef.current.animateCamera({center: myLocation});
    }

    return (
        <View style={styles.container}>
          <View style={styles.appBar}>
              <Appbar.BackAction onPress={() => {}} />
              <View style={styles.profile}>
                <Avatar.Image size={45} source={require('../../assets/yo.jpg')} />
                <Text>Alejo Villores</Text>
              </View>
          </View>
          <MapView
            style={styles.map}
            region={{
              latitude: myLocation.latitude, 
              longitude: myLocation.longitude,
              latitudeDelta: 0.0921,
              longitudeDelta: 0.05,
            }}
            ref={mapRef}
            showsUserLocation={false}
          >

            <Marker 
            coordinate={myLocation}
            title="Aqui estas tú"
            >
                <Image
                  source={car()}
                  style={{width: 70, height: 70}}
                  resizeMode="contain"
                />
            </Marker>
            <Marker 
            coordinate={desde}
            title="Aqui estas tú"
            >
            </Marker>
            <Marker 
            coordinate={hasta}
            title="Aqui estas tú"
            >
            </Marker>

            <Polyline
              coordinates={route}
              strokeWidth={2}
             />
            <FAB
              icon={locationIcon}
              style={styles.fab}
              onPress={goToMyLocation}
            />
          </MapView>
          <View style={styles.buttonsBox}>
            <Button
            mode="contained"
            style={styles.startButton}
            disabled={!arrived}
            onPress={startJourney}>
              <Text>Comenzar</Text>
            </Button>
            <Button
            
            mode="contained"
            style={styles.startButton}
            onPress={goToPassenger}
            disabled={arrived}
            color={Colors.green600}>
              <Text>ir</Text>
            </Button>
            <Button
            mode="contained"
            color={Colors.red600}
            disabled={!arrived}
            style={styles.finishButton}
            onPress={() => {
              console.log("End trip")
            }}
            >
              <Text>Terminar</Text>
            </Button>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection:'column',
      backgroundColor:'#bebeb6'
      
    },
    map: {
      width: '100%',
      height: '80%',
    },
    buttonsBox: {
      flex:1,
      flexDirection: 'row',
      justifyContent:'space-around',
      alignItems:'center',
    },
    finishButton: {
      paddingHorizontal:2,
    },
    startButton: {
      paddingHorizontal:2,
    },
    appBar:{      
      flex:1,
      flexDirection: 'row',
      justifyContent:'space-between',
      padding:10
    },
    profile:{
      alignItems:'center',
      padding:5
    },
    fab: {
      position: 'absolute',
      backgroundColor: '#ffff',
      margin: 10,
      right: 0,
      bottom: 0,
    },
})

export default DriverJourney; 