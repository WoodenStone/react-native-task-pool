import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';

import MyDatePicker from '../DatePicker/DatePicker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const TaskInputField = props => {
  const [task, setTask] = useState();
  const [taskTime, setTaskTime] = useState(null);

  const itemColor = props.itemColor;
  // let col = '#' + (parseInt(itemColor.slice(1), 16) - 777777).toString(16);
  const handleAddTask = taskContent => {
    if (!taskContent) {
      return;
    }
    const value = {
      task: taskContent,
      time: taskTime,
    };
    props.addTask(value);
    setTask(null);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, {backgroundColor: itemColor}]}>
      <MyDatePicker setTaskTime={setTaskTime} />
      <TextInput
        style={styles.inputField}
        value={task}
        onChangeText={text => setTask(text)}
        placeholder={'添加一个任务'}
        placeholderTextColor={'#232323'}
      />
      <TouchableOpacity onPress={() => handleAddTask(task)}>
        <AntDesign name="check" size={23} color="#121212" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default TaskInputField;

const styles = StyleSheet.create({
  container: {
    borderColor: '#eee',
    // backgroundColor: '#3E3368',
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 10,
  },
  inputField: {
    color: '#000',
    height: 50,
    flex: 1,
  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
