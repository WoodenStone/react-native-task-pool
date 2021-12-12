import React, {useState, useContext, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import HomePage from '../component/Home';
import Statistic from '../component/Statistic/Statistic';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useGlobalContext} from '../../App';
import StorageUtil from '../utils/StorageUtil';
import {lightThemeSelected, darkThemeSelected} from '../store/theme';
import {doubleLayoutSelected, singleLayoutSelected} from '../store/cardLayout';

const Tab = createMaterialBottomTabNavigator();

const AppRouter = () => {
  const themeDispatch = useGlobalContext(({dispatch}) => dispatch.appTheme);
  const layoutDispatch = useGlobalContext(({dispatch}) => dispatch.appLayout);
  useEffect(() => {
    StorageUtil.getValue('hasInit').then(res => {
      if (!res) {
        const initValue = {
          theme: 'light',
          cardTheme: 0,
          cardLayout: 'double',
        };
        StorageUtil.setValue('hasInit', initValue).then(result => {
          if (result) {
            themeDispatch(lightThemeSelected());
            layoutDispatch(doubleLayoutSelected());
          }
        });
      } else {
        res.value.theme === 'light'
          ? themeDispatch(lightThemeSelected())
          : themeDispatch(darkThemeSelected());
        res.value.cardLayout === 'single'
          ? layoutDispatch(singleLayoutSelected())
          : layoutDispatch(doubleLayoutSelected());
      }
    });
  }, [themeDispatch, layoutDispatch]);

  const tabTheme = useGlobalContext(({state}) => state.appTheme.theme);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        barStyle={{backgroundColor: tabTheme.backgroundColor}}
        activeColor={tabTheme.name === 'dark' ? '#A2D2FF' : '#123456'}
        inactiveColor={tabTheme.name === 'dark' ? '#BDE0FE' : '#789abc'}
        shifting={true}
        screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({color}) => (
              <AntDesign name="home" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="统计"
          component={Statistic}
          options={{
            tabBarLabel: '统计',
            tabBarIcon: ({color}) => (
              <AntDesign name="piechart" size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default AppRouter;
