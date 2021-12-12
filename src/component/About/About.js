import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useGlobalContext} from '../../../App';

const lightThemeText = {
  h1: '#000',
  h2: '#5b3223',
  h3: '#354c5f',
  text: '#272822',
  link: '#0178be',
  divisionLine: '#787878aa',
};
const darkThemeText = {
  h1: '#e9e9e9',
  h2: '#46bfd5',
  h3: '#f9972a',
  text: '#9e9e9e',
  link: '#2ddac6',
  divisionLine: '#7f7f7f',
};
const About = () => {
  const themeCurrent = useGlobalContext(({state}) => state.appTheme.theme);

  function openBilibili() {
    const url =
      'https://www.bilibili.com/video/BV1x44y1x7b7?share_source=copy_web';
    Linking.openURL(url);
  }

  function openGithub() {
    const url = 'https://github.com/WoodenStone/react-native-task-pool';
    Linking.openURL(url);
  }

  const [textCurrent, setTextCurrent] = useState(lightThemeText);

  useEffect(() => {
    themeCurrent.name === 'dark'
      ? setTextCurrent(darkThemeText)
      : setTextCurrent(lightThemeText);
  }, [themeCurrent]);

  return (
    <ScrollView
      style={[
        styles.container,
        {backgroundColor: themeCurrent.backgroundColor},
      ]}>
      <View style={styles.content}>
        <Text style={[styles.h1, {color: textCurrent.h1}]}>任务管理池</Text>
        <View
          style={[
            styles.divisionLine,
            {borderBottomColor: textCurrent.divisionLine},
          ]}
        />
        <Text style={[styles.h2, {color: textCurrent.h2}]}>灵感来源</Text>
        <Text style={[styles.text, styles.textMain, {color: textCurrent.text}]}>
          本项目灵感来源于CodeSheep的B站视频:{'\n'}
          <TouchableOpacity onPress={openBilibili} style={styles.wrapper}>
            <Icon name="dashboard" color="#0178be" size={20} />
            <Text style={[styles.link, {color: textCurrent.link}]}>
              点我直达
            </Text>
          </TouchableOpacity>
          {'\n'}
          用朴素的思想将七个池子都列为TODO
          List。仅用于学习react-native及个人使用，如果任何问题，请联系我~！
        </Text>

        <Text style={[styles.h2, {color: textCurrent.h2}]}>联系开发者</Text>

        <Text style={[styles.h3, {color: textCurrent.h3}]}>项目作者</Text>
        <Text style={[styles.text, {color: textCurrent.text}]}>
          WoodenStone
        </Text>
        <Text style={[styles.h3, {color: textCurrent.h3}]}>本项目GitHub</Text>
        <TouchableOpacity onPress={openGithub}>
          <Text style={[styles.link, {color: textCurrent.link}]}>
            WoodenStone/react-native-task-pool
          </Text>
        </TouchableOpacity>
        <Text style={[styles.h3, {color: textCurrent.h3}]}>开发者邮箱</Text>
        <Text style={[styles.text, {color: textCurrent.text}]}>
          withWoodenStone@gmail.com
        </Text>
        <Text style={[styles.text, {color: textCurrent.text}]}>
          如关于本项目有任何问题，欢迎联系！
        </Text>
      </View>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  textMain: {
    alignItems: 'center',
    textAlign: 'center',
  },
  h1: {
    alignSelf: 'center',
    paddingVertical: 20,
    fontFamily: 'SourceHanSerifSC-VF',
    fontWeight: 'bold',
    fontSize: 30,
  },
  divisionLine: {
    height: 0,
    borderBottomColor: 'rgba(30, 30, 30, 0.7)',
    borderBottomWidth: 2,
  },
  h2: {
    fontSize: 25,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  h3: {
    fontSize: 20,
    paddingVertical: 10,
  },
  wrapper: {
    flexDirection: 'row',
  },
  center: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
  link: {
    fontSize: 18,
  },
  padding: {
    paddingVertical: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
