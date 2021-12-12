import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

import TaskList from '../TaskList/TaskList';

const TaskFinished = ({route, navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({headerTitle: route.params?.params.name}, []);
  });
  const itemColor = route.params.itemColor;
  return (
    <View>
      <TaskList storageKey="taskFinished" itemColor={itemColor} />
    </View>
  );
};

export default TaskFinished;

const styles = StyleSheet.create({
  archiveButton: {
    position: 'absolute',
    top: 0,
    height: 200,
    left: 0,
    zIndex: 999,
  },
});
