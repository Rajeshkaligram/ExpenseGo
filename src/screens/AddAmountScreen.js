import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {VectorIcon, colors, fonts, formatDateWithMonth} from '../common';
import {addAmountStore} from '../store';
import {Dropdown} from '.';
import {EXPENSE_INFO, I_EXPENSES, I_TYPE, I_TYPE_KEY} from '../common/constant';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  inputStyle: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    fontFamily: fonts.medium,
    fontSize: 30,
    paddingLeft: 20,
  },
  bodyMain: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  boldBlackTxt: {
    fontFamily: fonts.bold,
    color: colors.greyText,
    fontSize: 20,
  },
  iconStyle: {
    position: 'absolute',
    top: '55%',
  },
  inputContainer: {
    width: '100%',
  },
  downIcon: {
    width: 45,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.greyBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  selectedTxt: {
    fontFamily: fonts.bold,
    color: colors.black,
    fontSize: 20,
  },
  buttonStyle: {
    width: '90%',
    height: 45,
    backgroundColor: colors.mainColor,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 10,
  },
  disableButtonStyle: {
    width: '90%',
    height: 45,
    backgroundColor: colors.greyBorder,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 10,
  },
  inputStyle2: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    fontFamily: fonts.bold,
    color: colors.black,
    fontSize: 20,
  },
});

export const AddAmountScreen = observer(({navigation}) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(false);
  const {selectedExpense, expenseInfo, type} = addAmountStore;

  useEffect(() => {
    addAmountStore.createTable();
    return addAmountStore.updateCreateExpenseInfo({});
  }, []);

  const saveData = () => {
    Keyboard.dismiss();
    addAmountStore.saveData();
    navigation.goBack();
  };

  useEffect(() => {
    if (!expenseInfo.date) {
      addAmountStore.updateCreateExpenseByKey(EXPENSE_INFO.DATE, new Date());
    }
  }, [expenseInfo.date]);

  const toggleType = () => {
    const newType = type.key === I_TYPE_KEY.EXPENSE ? I_TYPE[1] : I_TYPE[0];
    addAmountStore.updateType(newType);
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      addAmountStore.updateCreateExpenseByKey(EXPENSE_INFO.DATE, selectedDate);
      console.log(selectedDate);
    }
  };
  useEffect(() => {
    if (expenseInfo?.amount && expenseInfo?.amount !== '') {
      setButtonStyle(true);
    } else {
      setButtonStyle(false);
    }
  }, [expenseInfo?.amount]);

  const headerComponet = () => {
    return (
      <View style={styles.headerMain}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VectorIcon
            type="Entypo"
            name="chevron-thin-left"
            color={colors.white}
            size={25}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const bodyComponent = () => {
    return (
      <View style={styles.bodyMain}>
        <View style={styles.inputContainer}>
          <Text style={styles.boldBlackTxt}>Amount</Text>
          <TextInput
            placeholder="Amount"
            style={styles.inputStyle}
            placeholderTextColor={colors.black}
            keyboardType="number-pad"
            value={expenseInfo?.amount}
            // onChange={txt => validateAmount(txt)}
            onChangeText={item =>
              addAmountStore.updateCreateExpenseByKey(EXPENSE_INFO.AMOUNT, item)
            }
          />
          <VectorIcon
            type="FontAwesome"
            name="inr"
            color={colors.black}
            size={25}
            style={styles.iconStyle}
          />
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.boldBlackTxt}>Date</Text>
            <Text style={styles.selectedTxt}>
              {formatDateWithMonth(expenseInfo?.date)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.downIcon}
            onPress={() => setShowDatePicker(true)}>
            <VectorIcon
              type="AntDesign"
              name="calendar"
              color={colors.black}
              size={22}
            />
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={expenseInfo.date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <View style={styles.row}>
          <View>
            <Text style={styles.boldBlackTxt}>Type</Text>
            <Text style={styles.selectedTxt}>{type?.displayName}</Text>
          </View>
          <TouchableOpacity style={styles.downIcon} onPress={toggleType}>
            <VectorIcon
              type="Octicons"
              name="arrow-switch"
              color={colors.black}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.boldBlackTxt}>Expenses made for</Text>
            <Text style={styles.selectedTxt}>
              {selectedExpense?.displayName}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.downIcon}
            onPress={() => setShowCategoryDropdown(true)}>
            <VectorIcon
              type="Entypo"
              name={showCategoryDropdown ? 'chevron-up' : 'chevron-down'}
              color={colors.black}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View style={{...styles.inputContainer, ...{marginTop: 20}}}>
          <Text style={styles.boldBlackTxt}>Description</Text>
          <TextInput
            placeholder="Write a note"
            style={styles.inputStyle2}
            placeholderTextColor={colors.black}
            keyboardType="default"
            value={expenseInfo?.note}
            onChangeText={item =>
              addAmountStore.updateCreateExpenseByKey(EXPENSE_INFO.NOTE, item)
            }
          />
        </View>
      </View>
    );
  };
  const bottomButton = () => {
    return (
      <TouchableOpacity
        style={buttonStyle ? styles.buttonStyle : styles.disableButtonStyle}
        onPress={() => saveData()}
        disabled={!buttonStyle}>
        <Text style={{...styles.selectedTxt, ...{color: colors.white}}}>
          Save
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <KeyboardAvoidingView
      style={styles.main}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {headerComponet()}
      {bodyComponent()}
      <Dropdown
        options={I_EXPENSES}
        isVisible={showCategoryDropdown}
        setVisibility={setShowCategoryDropdown}
      />
      {bottomButton()}
    </KeyboardAvoidingView>
  );
});
