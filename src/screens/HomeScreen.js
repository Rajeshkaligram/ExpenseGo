import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {VectorIcon, colors, fonts, monthDate} from '../common';
import {openDatabase} from 'react-native-sqlite-storage';
import {addAmountStore} from '../store';

var db = openDatabase({name: 'UserDatabase.db'});

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
    fontFamily: fonts.bold,
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
  const {allTransaction} = addAmountStore;
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM table_user', [], (_txn, res) => {
        console.log(res?.rows?.item);
        var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
          console.log(res.rows.item(i));
        }
        addAmountStore.updateAllTransaction(temp);
      });
    });
  }, []);

  useEffect(() => {
    console.log(allTransaction);
  }, [allTransaction]);

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
        <FlatList
          data={allTransaction}
          keyExtractor={item => item.user_id}
          renderItem={({item}) => {
            return (
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
                  <Text style={styles.commonBlackTxt}>{item?.reasons}</Text>
                </View>
                <Text style={styles.commonBlackTxt}>{item?.amount}</Text>
              </View>
            );
          }}
        />
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
