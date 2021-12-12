import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome';

import TaskReady from './TaskView/TaskReady';
import TaskPlanned from './TaskView/TaskPlanned';
import TaskExecuting from './TaskView/TaskExecuting';
import TaskInspected from './TaskView/TaskInspected';
import TaskBlocked from './TaskView/TaskBlocked';
import TaskFinished from './TaskView/TaskFinished';
import TaskWhatever from './TaskView/TaskWhatever';
import About from './About/About';
import {routeConfig} from '../config/MainPage';
import {theme} from '../config/Theme';
import {useGlobalContext} from '../../App';

import {lightThemeSelected, darkThemeSelected} from '../store/theme';
import StorageUtil from '../utils/StorageUtil';

import {singleLayoutSelected, doubleLayoutSelected} from '../store/cardLayout';
import Tutorial from './About/Tutorial';

const CardColorContext = React.createContext(null);

/* 首页卡片 */
const Card = props => {
  const cardLayoutCurrent = useGlobalContext(
    ({state}) => state.appLayout.cardLayout,
  );

  const layoutStyle =
    cardLayoutCurrent.name === 'single'
      ? Object.assign({}, styles.cardSingleRow)
      : Object.assign({}, styles.cardDoubleRow);

  const [name, pageName, _nav, bgColor, iconName] = [
    props.name,
    props.pageName,
    props.nav,
    props.bgColor || 'lightblue',
    props.iconName,
  ];
  return (
    <TouchableOpacity
      style={[
        styles.card,
        layoutStyle,
        {backgroundColor: bgColor},
        styles.cardShadow,
      ]}
      onPress={() =>
        _nav.navigate(pageName, {
          params: {name: name, nav: _nav},
        })
      }>
      <Icon name={iconName} size={35} color="#282b62" />
      <Text style={styles.cardText}>{name}</Text>
    </TouchableOpacity>
  );
};

// 根据传入的数字修改卡片配色
function changeTheme(choice) {
  let colorScheme = theme[choice];
  colorScheme &&
    routeConfig.map((item, index) => {
      item[2] = colorScheme[index];
    });
}

/* 给各个页面创建卡片 */
/* routeConfig:
    0: 页面名称
    1: 路由名
    2: 卡片配色 */
const MainPage = ({navigation}) => {
  const cardTheme = useContext(CardColorContext);
  const themeCurrent = useGlobalContext(({state}) => state.appTheme.theme);

  // 配色修改
  const [color, setColor] = useState('blue');
  useEffect(() => {
    setColor(cardTheme.cardColor);
    changeTheme(color);
  }, [color, cardTheme]);

  return (
    <ScrollView
      style={{backgroundColor: themeCurrent.mainPageColor}}
      contentContainerStyle={styles.container}>
      {routeConfig.map(item => (
        <Card
          name={item[0]}
          nav={navigation}
          key={item[0]}
          pageName={item[1]}
          bgColor={item[2]}
          iconName={item[3]}
        />
      ))}
    </ScrollView>
  );
};

/* 侧边栏内容 */
function CustomDrawerContent(props) {
  const cardColor = useContext(CardColorContext);
  const themeCurrent = useGlobalContext(({state}) => state.appTheme.theme);
  const themeChanger = useGlobalContext(({dispatch}) => dispatch.appTheme);

  const cardLayoutCurrent = useGlobalContext(
    ({state}) => state.appLayout.cardLayout,
  );
  const cardLayoutChanger = useGlobalContext(
    ({dispatch}) => dispatch.appLayout,
  );

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View>
        <Image
          style={styles.drawerImg}
          source={require('../assets/taskPool.jpg')}
          resizeMode="contain"
        />
      </View>
      <DrawerItem
        label={() => (
          <View style={styles.drawerItem}>
            <Icon name="adjust" size={20} color={themeCurrent.fontColor} />
            <Text
              style={[
                {
                  color: themeCurrent.fontColor,
                },
                styles.drawerItemText,
              ]}>
              {themeCurrent.name === 'dark' ? '浅色模式' : '深色模式'}
            </Text>
          </View>
        )}
        onPress={() => {
          // console.log(themeCurrent.name === 'dark');
          if (themeCurrent.name === 'light') {
            themeChanger(darkThemeSelected());
            StorageUtil.getValue('hasInit')
              .then(res => {
                res.value.theme = 'dark';
                return res;
              })
              .then(resAfter => {
                console.log(resAfter.value);
                StorageUtil.setValue('hasInit', {...resAfter.value});
              });
          } else {
            themeChanger(lightThemeSelected());
            StorageUtil.getValue('hasInit')
              .then(res => {
                res.value.theme = 'light';
                return res;
              })
              .then(resAfter => {
                StorageUtil.setValue('hasInit', {...resAfter.value});
              });
          }
          props.navigation.closeDrawer();
        }}
      />
      <DrawerItem
        label={() => (
          <View style={styles.drawerItem}>
            <Icon name="magic" size={20} color={themeCurrent.fontColor} />
            <Text
              style={[
                {
                  color: themeCurrent.fontColor,
                },
                styles.drawerItemText,
              ]}>
              随机配色
            </Text>
          </View>
        )}
        onPress={() => {
          let timer = () => {
            cardColor.changeCardColor();
            setTimeout(() => {
              props.navigation.closeDrawer();
            }, 0);
          };
          timer();
        }}
      />
      <DrawerItem
        label={() => (
          <View style={styles.drawerItem}>
            <Icon name="columns" size={20} color={themeCurrent.fontColor} />
            <Text
              style={[
                {
                  color: themeCurrent.fontColor,
                },
                styles.drawerItemText,
              ]}>
              {cardLayoutCurrent.name === 'single' ? '双列布局' : '单列布局'}
            </Text>
          </View>
        )}
        onPress={() => {
          // console.log(cardLayoutCurrent);
          if (cardLayoutCurrent.name === 'double') {
            cardLayoutChanger(singleLayoutSelected());
            StorageUtil.getValue('hasInit')
              .then(res => {
                // console.log(res);
                res.value.cardLayout = 'single';
                return res;
              })
              .then(resAfter => {
                StorageUtil.setValue('hasInit', {...resAfter.value});
              });
          } else {
            cardLayoutChanger(doubleLayoutSelected());
            StorageUtil.getValue('hasInit')
              .then(res => {
                res.value.cardLayout = 'double';
                return res;
              })
              .then(resAfter => {
                StorageUtil.setValue('hasInit', {...resAfter.value});
              });
          }
          // cardLayoutDrawer.changeCardLayout();
          props.navigation.closeDrawer();
        }}
      />
      <DrawerItem
        label={() => (
          <View style={styles.drawerItem}>
            <Icon name="wrench" size={20} color={themeCurrent.fontColor} />
            <Text
              style={[
                {
                  color: themeCurrent.fontColor,
                },
                styles.drawerItemText,
              ]}>
              使用教程
            </Text>
          </View>
        )}
        onPress={() => {
          props.navigation.navigate('Tutorial');
          props.navigation.closeDrawer();
        }}
      />
      <DrawerItem
        label={() => (
          <View style={styles.drawerItem}>
            <Icon name="info-circle" size={20} color={themeCurrent.fontColor} />
            <Text
              style={[
                {
                  color: themeCurrent.fontColor,
                },
                styles.drawerItemText,
              ]}>
              关&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;于
            </Text>
          </View>
        )}
        onPress={() => {
          props.navigation.navigate('About');
          props.navigation.closeDrawer();
        }}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const [cardColor, setCardColor] = useState(0);
  // const [cardLayout, setCardLayout] = useState('double');
  const themeCurrent = useGlobalContext(({state}) => state.appTheme.theme);
  function changeCardColor() {
    setCardColor(Math.floor(Math.random() * theme.length));
  }
  /* function changeCardLayout() {
    setCardLayout(cardLayout === 'single' ? 'double' : 'single');
  } */
  return (
    <CardColorContext.Provider value={{cardColor, changeCardColor}}>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: themeCurrent.backgroundColor,
            width: '70%',
          },
          drawerLabelStyle: themeCurrent.fontColor,
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="首页"
          component={MainPage}
          options={{
            headerStyle: {backgroundColor: themeCurrent.backgroundColor},
            headerTintColor: themeCurrent.fontColor,
            drawerActiveTintColor: null,
            drawerActiveBackgroundColor: null,
            drawerItemStyle: {width: 0, height: 0},
          }}
        />
      </Drawer.Navigator>
    </CardColorContext.Provider>
  );
};

const Stack = createNativeStackNavigator();

/* 进行主页需要展示的各个页面的注册 */
const HomePage = ({navigation, route}) => {
  const themeCurrent = useGlobalContext(({state}) => state.appTheme.theme);
  return (
    <Stack.Navigator initialRouteName="MainPage">
      <Stack.Screen
        name="drawerContainer"
        component={MyDrawer}
        options={{headerShown: false}}
      />
      <Stack.Group
        screenOptions={{
          headerStyle: {
            backgroundColor: themeCurrent.backgroundColor,
          },
          headerTintColor: themeCurrent.fontColor,
          headerShadowVisible: true,
          animation: 'slide_from_right',
          presentation: 'transparentModal',
          orientation: 'portrait',
        }}>
        <Stack.Screen
          name="TaskPlanned"
          component={TaskPlanned}
          initialParams={{itemColor: routeConfig[0][2]}}
        />
        <Stack.Screen
          name="TaskReady"
          component={TaskReady}
          initialParams={{itemColor: routeConfig[1][2]}}
        />
        <Stack.Screen
          name="TaskExecuting"
          component={TaskExecuting}
          initialParams={{itemColor: routeConfig[2][2]}}
        />
        <Stack.Screen
          name="TaskInspected"
          component={TaskInspected}
          initialParams={{itemColor: routeConfig[3][2]}}
        />
        <Stack.Screen
          name="TaskFinished"
          component={TaskFinished}
          initialParams={{itemColor: routeConfig[4][2]}}
        />
        <Stack.Screen
          name="TaskBlocked"
          component={TaskBlocked}
          initialParams={{itemColor: routeConfig[5][2]}}
        />
        <Stack.Screen
          name="TaskWhatever"
          component={TaskWhatever}
          initialParams={{itemColor: routeConfig[6][2]}}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            title: '关于',
          }}
        />
        <Stack.Screen
          name="Tutorial"
          component={Tutorial}
          options={{
            title: '使用教程',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardDoubleRow: {
    width: '43%',
    padding: 10,
    margin: 10,
    height: 120,
    borderRadius: 10,
  },
  cardSingleRow: {
    width: '80%',
    padding: 10,
    margin: 5,
    height: 100,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 20,
    color: '#111',
  },
  imgContainer: {
    width: 300,
    height: 200,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drawerImg: {
    width: 300,
    height: 200,
  },
  drawerItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerItemText: {
    fontSize: 17,
    paddingLeft: 30,
  },
});
