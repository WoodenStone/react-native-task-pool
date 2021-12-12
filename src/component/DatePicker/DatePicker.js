import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';

import {CalendarList, DatePicker} from 'react-native-common-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MyDatePicker = props => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(null);
  let now = new Date();
  let future = new Date(2023, 12);
  return (
    <View>
      <Modal
        animationType={'slide'}
        visible={visible}
        style={styles.modal}
        transparent={true}>
        <View style={styles.pickerContainer}>
          <DatePicker
            defaultDate={now}
            width={250}
            cancel={() => setVisible(false)}
            minDate={now}
            maxDate={future}
            cancelText="取消"
            confirmText="确定"
            backgroundColor="#ececec"
            confirm={data => {
              setDate(data);
              props.setTaskTime(data);
              setVisible(false);
            }}
          />
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setVisible(true);
        }}>
        <AntDesign name={'calendar'} size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default MyDatePicker;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 25,
    width: 25,
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    flex: 1,
    // position: 'absolute',
    height: 250,
    width: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
});
