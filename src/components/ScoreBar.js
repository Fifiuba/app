import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

export const ScoreBar = () => {
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const starCornerUrl = 'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true';
  const starFilledUrl = 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';

  return (
    <View style={styles.container}>
      {
        maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImage}
                source={
                        item <= defaultRating ?
                        {uri: starFilledUrl} :
                        {uri: starCornerUrl}
                }
              />
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 30,
  },
  starImage: {
    width: 30,
    height: 30,
    margin: 5,
  },
});
