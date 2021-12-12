import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

const TaskItem = props => {
  const [isEdit, setedit] = useState(false);

  const [taskUpd, setTask] = useState();

  const [taskTime, setTaskTime] = useState(null);

  useEffect(() => {
    // console.log(taskTime, '时间');
  }, [taskTime]);

  function updateTask(text) {
    setTask(text);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.indexContainer, {backgroundColor: props.itemColor}]}>
        {/* <MyDatePicker setTaskTime={setTaskTime} /> */}
        {props.task.time ? (
          <Text style={styles.taskText}>
            {props.task.time.split('-')[1] +
              '/' +
              props.task.time.split('-')[2]}
          </Text>
        ) : (
          <AntDesign name="clockcircleo" size={20} color="#454545" />
        )}
      </View>
      <View style={[styles.taskContainer, {backgroundColor: props.itemColor}]}>
        {isEdit ? (
          <KeyboardAvoidingView>
            <TextInput
              style={{color: '#121212'}}
              value={taskUpd}
              onChangeText={text => updateTask(text)}
              placeholder="点击修改"
            />
          </KeyboardAvoidingView>
        ) : (
          <TouchableOpacity
            style={styles.task}
            onPress={() => {
              setedit(true);
            }}>
            <Text style={styles.taskText}>{props.task.content}</Text>
          </TouchableOpacity>
        )}
        {isEdit ? (
          <TouchableOpacity
            onPress={() => {
              taskUpd &&
                props.settaskUpd({
                  id: props.task.id,
                  content: taskUpd,
                  status: props.task.status,
                });
              setedit(false);
            }}>
            {/* <Text style={styles.tip}>完成</Text> */}
            <AntDesign name="checkcircleo" size={20} color="#454545" />
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity onPress={() => props.deleteTask()}>
              {/* <Text style={styles.tip}>删除</Text> */}
              <AntDesign name="delete" size={20} color="#454545" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
  },
  indexContainer: {
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  index: {
    color: '#000',
    fontSize: 20,
  },
  taskContainer: {
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 50,
  },
  task: {
    width: '90%',
  },
  taskText: {
    fontSize: 16,
    color: '#121212',
  },
  tip: {
    color: '#232323',
    fontSize: 14,
  },
  delete: {
    marginLeft: 10,
  },
});
