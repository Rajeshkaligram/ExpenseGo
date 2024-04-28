import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {VectorIcon, colors, fonts, monthDate} from '../common';
import {addAmountStore} from '../store';
import {I_EXPENSES} from '../common/constant';

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
    fontSize: 15,
  },
  boldTxt: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: 35,
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
  border: {
    borderBottomColor: colors.greyBorder,
    borderBottomWidth: 0.6,
  },
});

export const HomeScreen = observer(({navigation}) => {
  const {allTransaction, getData} = addAmountStore;

  useEffect(() => {
    getData();
  }, [getData]);

  // Calculate total expense
  const totalExpense = allTransaction.reduce(
    (total, transaction) =>
      transaction.type === 'Expense' ? total + transaction.amount : total,
    0,
  );

  // Calculate total income
  const totalIncome = allTransaction.reduce(
    (total, transaction) =>
      transaction.type === 'Income' ? total + transaction.amount : total,
    0,
  );

  // Calculate total amount (income - expense)
  const totalAmount = allTransaction.reduce(
    (total, transaction) =>
      transaction.type === 'Income'
        ? total + transaction.amount
        : total - transaction.amount,
    0,
  );

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
        <Text style={styles.boldTxt}>{totalAmount}</Text>
        <Text style={styles.commonTxt}>Expense: - {totalExpense}</Text>
        <Text style={styles.commonTxt}>Income: + {totalIncome}</Text>
      </View>
    );
  };
  const bodyContainer = () => {
    return (
      <View style={styles.bodyMain}>
        <Text style={styles.boldBlackTxt}>All Transaction</Text>
        <FlatList
          data={allTransaction}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            const expenseIcon = I_EXPENSES.find(
              expense => expense.displayName === item.reasons,
            );
            return (
              <>
                <TouchableOpacity
                  style={styles.row2}
                  onPress={() =>
                    navigation.navigate('ItemDetailsScreen', {detail: item})
                  }>
                  <View style={styles.row}>
                    <View
                      style={{
                        ...styles.iconBack,
                        backgroundColor: expenseIcon?.color || colors.mainColor,
                      }}>
                      <VectorIcon
                        type={expenseIcon?.type || 'Ionicons'}
                        name={expenseIcon?.name || 'fast-food'}
                        color={colors.white}
                        size={20}
                      />
                    </View>
                    <Text style={styles.commonBlackTxt}>{item?.reasons}</Text>
                  </View>
                  <View style={styles.row}>
                    <VectorIcon
                      type="Entypo"
                      name={item?.type === 'Expense' ? 'minus' : 'plus'}
                      size={20}
                      color={
                        item?.type === 'Expense' ? colors.black : colors.sky
                      }
                    />
                    <Text
                      style={{
                        ...styles.commonBlackTxt,
                        ...{
                          fontFamily: fonts.black,
                          color:
                            item?.type === 'Expense'
                              ? colors.black
                              : colors.sky,
                        },
                      }}>
                      {item?.amount}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.border} />
              </>
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

      <View style={{flex: 1, paddingBottom: 5}}>
        {bodyContainer()}
        {bootomButton()}
      </View>
    </View>
  );
});
