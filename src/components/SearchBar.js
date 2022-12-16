import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Feather} from '@expo/vector-icons';

/* eslint-disable-next-line max-len */
const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked, placeholderValue}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather
          name="search"
          size={20}
          color="black"
          style={{marginLeft: 1}}
        />
        <TextInput
          mode='flat'
          style={styles.input}
          placeholder={placeholderValue}
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
      </View>
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  searchBar: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    marginLeft: 15,
    width: '90%',
    height: 35,
  },
});
