import {
  FlatList,
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {VectorIcon, colors, fonts, monthDate} from '../common';
import {addAmountStore} from '../store';
import {I_EXPENSES} from '../common/constant';
import {
  InterstitialAd,
  AdEventType,
  BannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
import {icons} from '../common/icons';
import {bannerAddId, interstitialId} from '../utils/app-utils';

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
    height: 60,
    width: 60,
    borderRadius: 999,
    backgroundColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 2,
    right: 30,
  },
  border: {
    borderBottomColor: colors.greyBorder,
    borderBottomWidth: 0.6,
  },
  noImage: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 100,
    resizeMode: 'contain',
  },
  noTxt: {
    fontFamily: fonts.bold,
    color: colors.black,
    fontSize: 20,
  },
  sectionHeader: {
    fontSize: 10,
    fontFamily: fonts.regular,
    color: colors.black,
    textAlign: 'center',
    paddingTop: 3,
  },
});

const interstitial = InterstitialAd.createForAdRequest(interstitialId, {
  keywords: ['fashion', 'clothing'],
});

export const HomeScreen = observer(({navigation}) => {
  const {allTransaction, getData} = addAmountStore;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    // Show the ad if it's loaded and the component is mounted for the first time
    if (loaded) {
      interstitial.show();
    }
  }, [loaded]);

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
        <Text style={styles.boldTxt}>{totalAmount.toLocaleString()}</Text>
        <Text style={styles.commonTxt}>
          Expense: - {totalExpense.toLocaleString()}
        </Text>
        <Text style={styles.commonTxt}>
          Income: + {totalIncome.toLocaleString()}
        </Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
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
              color={item?.type === 'Expense' ? colors.black : colors.sky}
            />
            <Text
              style={{
                ...styles.commonBlackTxt,
                ...{
                  fontFamily: fonts.black,
                  color: item?.type === 'Expense' ? colors.black : colors.sky,
                },
              }}>
              {item?.amount?.toLocaleString()}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.border} />
      </>
    );
  };

  const groupByMonth = transactions => {
    // Create a sorted copy of the transactions by date
    const sortedTransactions = transactions
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const groupedData = {};

    sortedTransactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const month = date.toLocaleString('default', {month: 'long'});
      const year = date.getFullYear();
      const monthYear = `${month} ${year}`;

      if (!groupedData[monthYear]) {
        groupedData[monthYear] = [];
      }
      groupedData[monthYear].push(transaction);
    });

    // Sort months in the correct order from January to December
    const monthOrder = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // Sort grouped data by month and year
    const sortedGroupedData = Object.keys(groupedData)
      .sort((a, b) => {
        const [monthA, yearA] = a.split(' ');
        const [monthB, yearB] = b.split(' ');

        // Compare by year first
        if (yearA !== yearB) return parseInt(yearA) - parseInt(yearB);

        // If years are the same, compare by month order
        return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
      })
      .map(monthYear => ({
        title: monthYear,
        data: groupedData[monthYear],
      }));

    return sortedGroupedData;
  };

  const bodyContainer = () => {
    const sections = groupByMonth(allTransaction);

    return (
      <View style={styles.bodyMain}>
        <Text style={styles.boldBlackTxt}>All Expense</Text>
        {sections.length > 0 ? (
          <SectionList
            sections={sections}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
          />
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={icons.NO_TRANSACTION} style={styles.noImage} />
            <Text style={styles.noTxt}>No Expense Found!</Text>
          </View>
        )}
      </View>
    );
  };

  const bannerAddComponent = () => {
    return (
      <BannerAd
        unitId={bannerAddId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
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
      {loaded && bannerAddComponent()}
    </View>
  );
});
