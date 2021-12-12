import React, {useState, useEffect} from 'react';
import Svg from 'react-native-svg';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import {VictoryChart, VictoryPie} from 'victory-native';
import useDeepCompareEffect from 'use-deep-compare-effect';
import AntDesign from 'react-native-vector-icons/AntDesign';

import StorageUtil from '../../utils/StorageUtil';

import {useGlobalContext} from '../../../App';

/* 获取并处理图标数据 */
async function getData() {
  const keyList = [
    'taskReady',
    'taskBlocked',
    'taskExecuting',
    'taskFinished',
    'taskInspected',
    'taskPlanned',
    'taskWhatever',
  ];
  const keyMap = new Map([
    ['taskPlanned', '任务\n准备池'],
    ['taskReady', '任务\n就绪池'],
    ['taskExecuting', '任务\n执行池'],
    ['taskInspected', '任务\n验收池'],
    ['taskFinished', '任务\n完成池'],
    ['taskBlocked', '任务\n阻塞池'],
    ['taskWhatever', '任务\n酱油池'],
  ]);
  const dataList = [];
  for (const key of keyList) {
    let res = await StorageUtil.getValue(key);
    if (res && res.value) {
      let validLength = res.value.filter(item => item.status === 0).length;
      validLength &&
        dataList.push({
          x: keyMap.get(key),
          y: validLength,
        });
    }
  }
  return dataList;
}

/* 获取归档任务条目 */
async function getTasks() {
  let res = await StorageUtil.getValue('taskFinished');
  const taskList = res && res.value.slice(0);
  let filteredTask;
  if (taskList.length) {
    filteredTask = taskList.filter(value => value.status === 1);
  } else {
    return [];
  }

  return filteredTask.length ? filteredTask.reverse() : [];
}

// 删除某项归档任务
async function deleteArchivedTask(item) {
  let res = await StorageUtil.getValue('taskFinished');
  // console.log(res);
  const taskList = res && res.value.slice(0);
  let filteredTask;
  if (taskList.length) {
    filteredTask = taskList.filter(value => value.id !== item.id);
  }
  StorageUtil.setValue('taskFinished', filteredTask);
  let newTaskList = await getTasks();
  return newTaskList;
}

const Statistic = () => {
  /* const renderItem = ({item}) => <Item title={item} />; */
  const [chartData, setChartData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskArchived, setTaskArchived] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const themeCurrent = useGlobalContext(({state}) => state.appTheme.theme);

  const removeItem = item => {
    deleteArchivedTask(item).then(res => {
      setTaskArchived(res);
    });
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.content}</Text>
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={() => {
            removeItem(item);
            // props.show(title);
          }}>
          <AntDesign name="closecircleo" color="#fff" size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    getData().then(res => {
      setChartData(res);
    });
  }, [refresh]);

  useEffect(() => {
    if (refresh) {
      getData().then(res => {
        setChartData(res);
      });
    }
    setRefresh(false);
  }, [refresh]);

  useDeepCompareEffect(() => {
    getTasks().then(res => {
      setTaskArchived(res);
    });
  }, [taskArchived]);

  return (
    <>
      <Modal
        animationType="slide"
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
          <FlatList
            data={taskArchived}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </TouchableOpacity>
      </Modal>
      <ScrollView style={{backgroundColor: themeCurrent.backgroundColor}}>
        <View style={[styles.centerView]}>
          <Text style={[styles.text, {color: themeCurrent.sentenceColor}]}>
            种一棵树最好的时候是十年前，其次是现在。
          </Text>
          <View style={styles.container}>
            {chartData.length ? (
              <Svg>
                <VictoryPie
                  animate={{duration: 500, easing: 'bounce'}}
                  innerRadius={({datum}) => datum.y * 5}
                  padding={{left: 80, right: 80}}
                  cornerRadius={({datum}) => datum.y * 10}
                  labelPlacement="vertical"
                  // labelRadius={140}
                  data={chartData}
                  colorScale={[
                    'tomato',
                    'mediumseagreen',
                    'orange',
                    'dodgerblue',
                    'gold',
                    'navy',
                    'cornflowerblue',
                  ]}
                  style={{
                    labels: {
                      fontSize: 15,
                      fill: '#c43a31',
                    },
                  }}
                  events={[
                    {
                      target: 'data',
                      eventHandlers: {
                        onLongPress: () => {
                          return [
                            {
                              target: 'labels',
                              mutation: props => {
                                return props.text === props.datum.y
                                  ? {text: props.datum.x}
                                  : {text: props.datum.y};
                              },
                            },
                          ];
                        },
                      },
                    },
                  ]}
                />
              </Svg>
            ) : (
              <View style={styles.centerView}>
                <Image
                  source={require('../../assets/empty.png')}
                  style={styles.emptyImg}
                />
                <Text style={styles.emptyText}>这里还空空如也……</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.refresh}
            onPress={() => {
              setRefresh(true);
            }}>
            <AntDesign
              name={'reload1'}
              size={20}
              color={themeCurrent.fontColor}
            />
          </TouchableOpacity>
          <View style={styles.buttons}>
            <Button
              title="查看已归档任务"
              color="#7d9ebf"
              onPress={() => {
                getTasks().then(res => {
                  setTaskArchived(res);
                  console.log(taskArchived);
                });
                setModalVisible(true);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Statistic;

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 30,
    fontFamily: 'SourceHanSerifSC-VF',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 380,
    width: 400,
    paddingHorizontal: 5,
  },
  emptyImg: {
    width: 300,
    height: 300,
  },
  emptyText: {
    fontSize: 25,
    color: 'grey',
  },
  modal: {
    position: 'absolute',
    top: '30%',
    flex: 1,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    backgroundColor: '#345a95ee',
    padding: 10,
    flexDirection: 'row',
    // width: '100%',
    marginVertical: 8,
    marginHorizontal: 35,
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    width: '90%',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refresh: {
    paddingRight: 20,
    alignSelf: 'flex-end',
  },
});
