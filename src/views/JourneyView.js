import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors, Text, ActivityIndicator, Button} from 'react-native-paper';

export default function JourneyView({route}) {
  const journeyInfo = route.params;

  /* eslint-disable no-unused-vars */
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('Tu chofer está en camino');

  React.useEffect(() => {
    if (!loading) {
      setText('Tu chofer está esperando por tí');
    }
  }, [loading]);

  const handleCancelJourney = async () => {
    try {
      const response = await cancelJourney(journeyInfo);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>{text}</Text>
        { loading &&
          <ActivityIndicator
            animating={loading}
            color="#757575"
            style={{marginTop: 10}}
          />}
        <Button
          style={styles.button}
          color={Colors.red800}
          mode="contained"
          onPress={() => console.log('Cancel journey')}>
          <Text style={styles.buttonText}>Cancelar viaje</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dddddd',
  },
  card: {
    height: 230,
    width: 360,
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 15,
    marginBottom: 20,
    fontSize: 20,
    color: '#282829',
    textAlign: 'center',
  },
  button: {
    padding: 5,
    width: 210,
    height: 50,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});
