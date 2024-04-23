import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';
import {VectorIcon, colors, fonts, monthDate} from '../common';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  headerMain: {
    backgroundColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  commonTxt: {
    fontFamily: fonts.medium,
    color: colors.white,
    fontSize: 13,
  },
  boldTxt: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyMain: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  boldBlackTxt: {
    fontFamily: fonts.black,
    color: colors.black,
    fontSize: 15,
  },
  iconBack: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: colors.mainColor,
    marginRight: 10,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  commonBlackTxt: {
    fontFamily: fonts.medium,
    color: colors.black,
    fontSize: 18,
  },
  buttonStyle: {
    height: 50,
    width: 50,
    borderRadius: 999,
    backgroundColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});

export const HomeScreen = observer(({navigation}) => {
  const headerComponent = () => {
    var currentDate = new Date();
    return (
      <View style={styles.headerMain}>
        <View style={styles.row}>
          <VectorIcon
            type="AntDesign"
            name="calendar"
            size={20}
            color={colors.white}
            style={{paddingRight: 5}}
          />
          <Text style={styles.commonTxt}>{monthDate(currentDate)}</Text>
        </View>
        <Text style={styles.boldTxt}>122</Text>
        <Text style={styles.commonTxt}>Expense: 0</Text>
        <Text style={styles.commonTxt}>Income: 199</Text>
      </View>
    );
  };
  const bodyContainer = () => {
    return (
      <View style={styles.bodyMain}>
        <Text style={styles.boldBlackTxt}>All Transction</Text>
        <View style={styles.row2}>
          <View style={styles.row}>
            <View style={styles.iconBack}>
              <VectorIcon
                type="MaterialIcons"
                name="fastfood"
                color={colors.white}
                size={20}
              />
            </View>
            <Text style={styles.commonBlackTxt}>Food</Text>
          </View>
          <Text style={styles.commonBlackTxt}>900</Text>
        </View>
      </View>
    );
  };
  const bootomButton = () => {
    return (
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('AddAmountScreen')}>
        <VectorIcon type="Feather" name="plus" color={colors.white} size={35} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      {headerComponent()}
      {bodyContainer()}
      {bootomButton()}
    </View>
  );
});
