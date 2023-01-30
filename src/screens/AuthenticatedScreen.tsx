import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Authenticated() {
  const user = auth().currentUser;
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>You have logged in successfully</Text>
      <Text style={styles.text}>{user?.displayName}</Text>
      <Text style={styles.text}>{user?.email}</Text>
      <View style={{marginTop: 30}}>
        <Button
          title="Log out"
          onPress={() => {
            auth().signOut();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc2c2'
  },
  title: {
    fontSize: 25,
    marginBottom: 30
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 150,
    marginBottom: 20
  },
  text: {
    fontSize: 20
  }
});
