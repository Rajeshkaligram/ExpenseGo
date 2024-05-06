import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {MainStack} from './src/Navigation/MainStack';
import {Provider, observer} from 'mobx-react';
import store from './src/store';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {isAndroid} from './src/utils/app-utils';
import {colors} from './src/common';

@observer
class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }
  render() {
    return (
      <Provider root={store}>
        <StatusBar
          backgroundColor={isAndroid() ? colors.black : colors.white}
          barStyle={isAndroid() ? 'light-content' : 'dark-content'}
        />
        <SafeAreaProvider>
          <SafeAreaView style={styles.main}>
            <MainStack />
          </SafeAreaView>
        </SafeAreaProvider>
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
