import React from 'react';
import {View} from 'react-native';

import TaskList from '../TaskList/TaskList';

const TaskPlanned = ({route, navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({headerTitle: route.params?.params.name}, []);
  });
  const itemColor = route.params.itemColor;
  return (
    <View>
      <TaskList storageKey="taskPlanned" itemColor={itemColor} />
    </View>
  );
};

export default TaskPlanned;
