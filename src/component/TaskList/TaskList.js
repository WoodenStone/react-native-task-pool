import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';

import StorageUtil from '../../utils/StorageUtil';
import TaskItem from '../TaskItem/TaskItem';
import TaskInputField from '../TaskItem/TaskInputField';

import useDeepCompareEffect from 'use-deep-compare-effect';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useGlobalContext} from '../../../App';

const TaskList = props => {
  let [tasks, setTasks] = useState([]);
  const [taskUpd, settaskUpd] = useState(null);
  const storageKey = props.storageKey;
  const [modalVisible, setModalVisible] = useState(false);
  const themeCurrent = useGlobalContext(({state}) => state.appTheme.theme);

  // 从async storage中获取任务列表
  useEffect(() => {
    StorageUtil.getValue(storageKey).then(res => {
      let data = res ? res.value : [];
      setTasks([...data]);
    });
  }, [storageKey]);

  useDeepCompareEffect(() => {
    // 将传入的列表存入async storage并使用该列表更新视图
    function storeTasks(list) {
      StorageUtil.setValue(storageKey, list);
      setTasks(list);
    }
    if (taskUpd) {
      for (const task of tasks) {
        if (task.id === taskUpd.id) {
          // dataToBeUpd = Object.assign({}, task);
          task.content = taskUpd.content;
        }
      }
    }
    const storageValue = [...tasks];
    storeTasks(storageValue);
  }, [taskUpd, storageKey, tasks]);

  // 添加一个任务
  const addTask = async task => {
    if (!task) {
      return;
    }
    const storageValue =
      tasks.length || task
        ? [
            ...tasks,
            {
              id: tasks.length + new Date().getTime(), // to avoid duplicates
              content: task.task,
              status: 0,
              time: task.time,
            },
          ]
        : [];

    // console.log(storageValue);
    // 存入async storage
    StorageUtil.setValue(storageKey, storageValue);
    setTasks(storageValue);

    Keyboard.dismiss();
  };
  // 删除一个任务（不实际删除，设置状态位）
  const deleteTask = async deleteId => {
    // 视图更新
    setTasks(tasks.filter(value => value.id !== deleteId));

    const taskBefore = Object.assign([], tasks);
    taskBefore.map((item, index) => {
      item.status = item.id === deleteId ? 2 : item.status;
    });

    // 更新要删除的条目status 为 2
    StorageUtil.setValue(storageKey, taskBefore);
  };

  // 任务归档
  function handleArchive() {
    setModalVisible(!modalVisible);

    tasks.forEach(item => {
      item.status = 1;
    });

    StorageUtil.setValue(storageKey, tasks);
    // console.log(storageKey);
    // console.log('Archived', tasks);
  }

  return (
    <View
      style={[styles.container, {backgroundColor: themeCurrent.mainPageColor}]}>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={styles.modal}
          activeOpacity={1}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContent}>
            <Text style={{color: '#121212'}}>确认全部归档吗？</Text>
            <TouchableOpacity
              style={[styles.modalButton, {backgroundColor: props.itemColor}]}
              onPress={() => {
                handleArchive();
              }}>
              <Text style={{color: '#121212'}}>确认</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView style={styles.scrollView}>
        {tasks.length > 0 &&
          tasks.map((task, index) => {
            return (
              task.status === 0 && (
                <View key={index}>
                  <TaskItem
                    task={task}
                    deleteTask={() => deleteTask(task.id)}
                    itemColor={props.itemColor}
                    index={index}
                    settaskUpd={settaskUpd}
                  />
                </View>
              )
            );
          })}
      </ScrollView>
      {storageKey === 'taskFinished' && (
        <TouchableOpacity
          style={[styles.archiveButton, {backgroundColor: props.itemColor}]}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <AntDesign name="checksquareo" size={20} />
        </TouchableOpacity>
      )}

      <TaskInputField addTask={addTask} itemColor={props.itemColor} />
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#eeeeeeee',
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  },
  archiveButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 100,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    // backgroundColor: '#99d8d6ef',
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 20,
    backgroundColor: '#efefef',
    borderColor: '#121212',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  modalButton: {
    backgroundColor: '#70d9ee',
    borderRadius: 20,
    marginTop: 10,
    padding: 10,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
});
