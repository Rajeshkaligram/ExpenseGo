import {SafeAreaView, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {MainStack} from './src/Navigation/MainStack';
import {Provider, observer} from 'mobx-react';
import store from './src/store';

@observer
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.main}>
          <MainStack />
        </SafeAreaView>
      </Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
