import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {observer} from 'mobx-react';
import {VectorIcon, colors, fonts} from '../common';
import {addAmountStore} from '../store';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
  },
  modalView: {
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 18,
    color: colors.black,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: colors.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  commonBlackTxt: {
    fontFamily: fonts.medium,
    color: colors.black,
    fontSize: 18,
  },
  crossBtn: {
    alignSelf: 'flex-end',
  },
  border: {
    borderBottomWidth: 0.8,
    borderBottomColor: colors.greyBorder,
  },
});

export const Dropdown = observer(({options, isVisible, setVisibility}) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setVisibility(false);
        }}>
        <View style={styles.main}>
          <View style={styles.modalView}>
            <View>
              {/* <View></View> */}
              <TouchableOpacity onPress={() => setVisibility(false)}>
                <VectorIcon
                  type="Entypo"
                  name="cross"
                  color={colors.black}
                  size={25}
                  style={styles.crossBtn}
                />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.container}>
              {options.map(option => (
                <View key={option.key}>
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                      addAmountStore.updateSelectedExpense(option);
                      setVisibility(false);
                    }}>
                    <View style={styles.row}>
                      <View
                        style={{
                          ...styles.iconBack,
                          ...{backgroundColor: option.color},
                        }}>
                        <VectorIcon
                          type={option.type}
                          name={option.name}
                          color={colors.white}
                          size={20}
                        />
                      </View>
                      <Text style={styles.commonBlackTxt}>
                        {option.displayName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.border} />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
});
