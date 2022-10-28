import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import {Stopwatch} from 'react-native-stopwatch-timer';

const TimerJourney = (data) => {
  // const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  // const [resetStopwatch, setResetStopwatch] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.sectionStyle}>
        <Stopwatch
          laps
          secs
          start={data.isStopwatchStart}
          // To start
          reset={data.resetStopwatch}
          // To reset
          options={options}
          // Options for the styling
          getTime={() => {}}
        />
      </View>
    </View>
  );
};

export default TimerJourney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const options = {
  container: {
    backgroundColor: '#bdbdbd',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: '#FFF',
  },
};

/*
 <TouchableHighlight
    onPress={() => {
      data.setIsStopwatchStart(!(data.isStopwatchStar));
      data.setResetStopwatch(false);
    }}>
    <Text style={styles.buttonText}>
      {!(data.isStopwatchStart) ? 'START' : 'STOP'}
    </Text>
  </TouchableHighlight>
  <TouchableHighlight
    onPress={() => {
      data.setIsStopwatchStart(false);
      data.setResetStopwatch(true);
    }}>
    <Text style={styles.buttonText}>RESET</Text>
  </TouchableHighlight>
*/
