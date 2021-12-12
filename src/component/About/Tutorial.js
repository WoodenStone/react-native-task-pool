import React, {useState, useEffect} from 'react';
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
  divisionLine: 'rgba(30, 30, 30, 0.7)',
};
const darkThemeText = {
  h1: '#e9e9e9',
  h2: '#46bfd5',
  h3: '#f9972a',
  text: '#9e9e9e',
  link: '#2ddac6',
  divisionLine: '#7f7f7f',
};

const Tutorial = () => {
  const themeCurrent = useGlobalContext(({state}) => state.appTheme.theme);

  const [textCurrent, setTextCurrent] = useState(lightThemeText);

  const indent = '        ';

  function openBilibili() {
    const url =
      'https://www.bilibili.com/video/BV1x44y1x7b7?share_source=copy_web';
    Linking.openURL(url);
  }

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
      <View style={[styles.mainContent]}>
        <Text style={[{color: textCurrent.h1}, styles.h1]}>
          欢迎使用任务管理池！🎉
        </Text>
        <Text style={[styles.text, {color: textCurrent.text}]}>
          {indent}
          在阅读本教程之前，强烈推荐你观看本App的创意来源，来自B站UP主「CodeSheep」的视频：
          <TouchableOpacity onPress={() => openBilibili()}>
            <Icon name="external-link" color="#0178be" size={20} />
          </TouchableOpacity>
          &nbsp;当然，也不妨读读下面的教程，以帮助你更快上手「任务管理池」。
        </Text>
        <Text style={[styles.h2, {color: textCurrent.h2}]}>主界面</Text>
        <Text style={[styles.text, {color: textCurrent.text}]}>
          {indent}
          进入App的第一个界面就是主界面啦！主界面共有7个池子，每个池子都有不同的名字和功能。在各个池子中，你都可以添加、修改、删除任务，还可以给新任务加上截止日期。如果你已经看过上面的视频的话，相信你一定会对UP主提出的「正向工作流」印象深刻。正是如此！这7个池子详细地帮你规划好了任务的分类，让你不用再面对重要程度和紧急程度各不相同的任务感到一团乱麻😫。从「任务计划池」开始，到「任务完成池」结束，是一个任务完整的「生命周期」。在这个周期中，任务由头脑中的一个点子，经过规划和执行，变成了人生旅途中的一段记忆。而最后两个池子，则承担着类似于记录「异常工作流」的功能：它们是某些具有特殊性质的任务的集中地。你是否还感到有些迷茫？没关系，下面，我将详细介绍每个池子的功能。
        </Text>
        <Text style={[styles.h3, {color: textCurrent.h3}]}>任务计划池</Text>
        <Text style={[styles.text, {color: textCurrent.text}]}>
          {indent}
          在这个池子中，你可以放入任何你想要做的事！无论是像「明天去买袜子」这样的小事，还是「5年内减肥20斤」的大事，亦或是「买一张去火星的船票」之类的天马行空的想法，只要是脑海中的idea，都可以放进这个池子！这是一个计划池，也是一个灵感收集池。当你毫无保留倒出了脑海中所有的想法，你对全局就有了掌控，就能更好地进行取舍与规划。
        </Text>
        <Text style={[styles.h3, {color: textCurrent.h3}]}>任务就绪池</Text>
        <Text style={[styles.text, {color: textCurrent.text}]}>
          {indent}
          在对任务计划池中的任务进行筛选之后，真正「确定要执行」的任务就可以进入到「任务就绪池」中来了。要知道，备忘清单的重要功能就是「Getting
          Things
          Done」，而要想真正地「执行」任务，就必须先明确哪些需要「执行」，以及「每一步该做什么」。例如，你可以将「完成从来没听过课的数值分析作业」细化为「花两小时弄明白SVD矩阵分解的原理」、「花一小时编写SVD矩阵分解的代码」和「花一小时总结SVD矩阵分解的要点」这三个步骤，这样当你想要完成作业时，就可以清楚地明白现在应当「搞懂原理」、「编程」还是「总结」。在任务就绪池中，就应当存放这样明确、简单、可执行的「细部任务」。
        </Text>
        <Text style={[styles.h3, {color: textCurrent.h3}]}>任务执行池</Text>
        <Text style={[styles.text, {color: textCurrent.text}]}>
          {indent}
          终于到了关键的一步：执行任务！在这个池子中，建议你只存放当天计划完成的任务，最好是「必须」完成、也「能够」完成的任务。「必须」是为了督促一定要按照计划执行，而「能够」则是希望你不要贪多：任务虽多，取三五即可。否则当每天晚上望着仍然有许多条目的任务列表时，你会对明天失去希望的😪。
        </Text>
        <Text style={[styles.h3, {color: textCurrent.h3}]}>任务验收池</Text>
        <Text style={[styles.text, {color: textCurrent.text}]}>
          {indent}
          当完成了一项值得回味和复盘的任务之后，你可以在任务验收池中新增一个条目，提醒自己：记得总结！这个池子就起到提醒回顾的功能。你可以集中地清空它，例如挑选一个周末，写博客、回顾一周来值得注意的bug、总结本周阅读过的技术文章。当然你或许会认为「验收」这个词增添了严肃的气氛：要真正完成一项需要总结的任务，就好像在经历一场考试🧐。
        </Text>
        <Text style={[styles.h3, {color: textCurrent.h3}]}>任务完成池</Text>
        <Text style={[styles.text, {color: textCurrent.text}]}>
          {indent}
          恭喜！来到这里的任务真正结束了它们的使命！🎊这是你的成果展览，你可以在这里看到你完成的一个个事项。当你觉得条目太多，点击右下角将已经完成的任务归档。在
          统计页中，可以看到已经归档的任务。
        </Text>
        <Text style={[styles.h3, {color: textCurrent.h3}]}>任务阻塞池</Text>
        <Text style={[styles.text, {color: textCurrent.text}]}>
          {indent}
          看到这个名字，你可能会想：任务阻塞的条件是等待I/O、等待协作……没错！在这里的任务就是那些「非一日之功」的任务。例如研究某个框架的源码、阅读某部经典却晦涩的著作。它们执行周期长，不能急于一时，却依然重要。或许某个任务在规划途中会进入到这个池子，但别忘了有朝一日把它们捡起来哦🔔。
        </Text>
        <Text style={[styles.h3, {color: textCurrent.h3}]}>任务酱油池</Text>
        <Text style={[styles.text, {color: textCurrent.text}]}>
          {indent}
          是的，打酱油的任务们的归宿！可做可不做、既不重要又不紧急的任务的聚集地。像「本周吃炸鸡」、「下午喝奶茶」之类的任务就可以放在这里，当然，你也可以把「周末约会」放在这里😈。
        </Text>
        <Text style={[styles.h2, {color: textCurrent.h2}]}>其它功能</Text>
        <Text style={[styles.h3, {color: textCurrent.h3}]}>界面风格</Text>
        <Text style={[styles.text, {color: textCurrent.text}]}>
          {indent}
          点击主页面顶部左侧的按钮可以打开侧边栏，在这里可以切换「深/浅色模式」和任务卡片的「单/双列布局」，或者点击「随机配色」给卡片换个皮肤，不过随机的颜色在下一次进入App时不一定能保留哦。
        </Text>
        <Text style={[styles.h3, {color: textCurrent.h3}]}>数据统计</Text>
        <Text style={[styles.text, {color: textCurrent.text}]}>
          {indent}
          底部导航右侧页面的图表展示了当前各池子中的任务条目数，如果空空如也的话，不妨添加一个任务吧！在右下角刷新图表，查看最新数据。或者轻触「查看已归档任务」，为自己的执行力鼓掌！
          {'\n'}
          {'\n'}
          {indent}
          感谢你阅读到了这里，祝你用得愉快！如有任何问题，欢迎邮箱联系：withWoodenStone@gmail.com😉
        </Text>
      </View>
    </ScrollView>
  );
};

export default Tutorial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: {
    fontSize: 25,
    paddingVertical: 20,
  },
  h2: {
    fontSize: 23,
    paddingVertical: 20,
  },
  h3: {
    fontSize: 20,
    paddingVertical: 15,
  },
  mainContent: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 18,
  },
});
