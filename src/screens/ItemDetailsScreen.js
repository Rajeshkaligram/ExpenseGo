import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';
import {VectorIcon, colors, fonts, formatDateWithMonth} from '../common';
import {addAmountStore} from '../store';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  headerMain: {
    backgroundColor: colors.mainColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  headingTxt: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: 20,
  },
  mainBody: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  commonBlackTxt: {
    fontFamily: fonts.bold,
    color: colors.black,
    fontSize: 15,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '50%',
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
  selectedTxt: {
    fontFamily: fonts.bold,
    color: colors.black,
    fontSize: 20,
  },
});

export const ItemDetailsScreen = observer(({navigation, route}) => {
  const {detail} = route.params;

  const handleEdit = () => {
    const {amount, date, description, reasons, type, user_id} = detail;
  };

  const headerComponet = () => {
    return (
      <View style={styles.headerMain}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VectorIcon
            type="Entypo"
            name="chevron-thin-left"
            color={colors.white}
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.headingTxt}>{detail?.reasons}</Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              `Delete ${detail?.reasons}`,
              `Are you sure you want to delete this ${detail?.type}`,
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    addAmountStore.deleteData(detail?.user_id);
                    navigation.goBack();
                  },
                },
              ],
            );
          }}>
          <VectorIcon
            type="MaterialIcons"
            name="delete"
            color={colors.white}
            size={30}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const bodyContainer = () => {
    return (
      <View style={styles.mainBody}>
        <View style={{...styles.row, marginTop: 0}}>
          <View style={styles.row2}>
            <VectorIcon
              type="FontAwesome"
              name="money"
              color={colors.black}
              size={20}
            />
            <Text style={{...styles.commonBlackTxt, paddingLeft: 10}}>
              Amount
            </Text>
          </View>
          <Text style={styles.commonBlackTxt}>
            {detail?.amount?.toLocaleString()}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.row2}>
            <VectorIcon
              type="MaterialIcons"
              name="category"
              color={colors.black}
              size={20}
            />
            <Text style={{...styles.commonBlackTxt, paddingLeft: 10}}>
              Category
            </Text>
          </View>
          <Text style={styles.commonBlackTxt}>{detail?.type}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.row2}>
            <VectorIcon
              type="AntDesign"
              name="calendar"
              color={colors.black}
              size={20}
            />
            <Text style={{...styles.commonBlackTxt, paddingLeft: 10}}>
              Date
            </Text>
          </View>
          <Text style={styles.commonBlackTxt}>
            {formatDateWithMonth(detail?.date)}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.row2}>
            <VectorIcon
              type="FontAwesome5"
              name="list-alt"
              color={colors.black}
              size={20}
            />
            <Text style={{...styles.commonBlackTxt, paddingLeft: 10}}>
              Remark
            </Text>
          </View>
          <Text
            style={{
              ...styles.commonBlackTxt,
              maxWidth: '50%',
              alignSelf: 'center',
            }}>
            {detail?.description}
          </Text>
        </View>
      </View>
    );
  };

  const editButton = () => {
    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={handleEdit}>
        <Text style={{...styles.selectedTxt, ...{color: colors.white}}}>
          Edit
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.main}>
      {headerComponet()}
      <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
        {bodyContainer()}
      </View>
      {/* {editButton()} */}
    </View>
  );
});
