import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet
} from 'react-native';

export default ActivityIndicatorExample = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={props.animating}
        style={styles.activityIndicator} size="large" color="white"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  activityIndicator: {
    height: 10,
    position: 'absolute',
  }
});