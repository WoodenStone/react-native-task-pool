import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageUtil {
  /**
   *
   * @param {string|number} key 要查询的关键字
   * @returns 存入结果，失败返回null
   */
  static async getValue(key) {
    if (!key) {
      return null;
    }
    key = key.toString();
    try {
      const result = await AsyncStorage.getItem(key);
      return result !== null ? JSON.parse(result) : null;
    } catch (e) {
      return null;
    }
  }
  /**
   *
   * @param {string|number} key 要存入的键
   * @param {string|Object} value 要存的值
   * @returns 成功返回true，失败返回false
   */
  static async setValue(key, value) {
    if (!key) {
      return;
    }
    key = key.toString();
    return await AsyncStorage.setItem(key, JSON.stringify({value}))
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
  /**
   *
   * @param {string|number} key 要删除的关键字
   * @returns 成功返回true, 失败返回false
   */
  static async deleteValue(key) {
    if (!key) {
      return;
    }
    return await AsyncStorage.removeItem(key)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
  /**
   *
   * @returns 成功返回true, 失败返回false
   */
  static async clearAll() {
    return await AsyncStorage.clear()
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}

export default StorageUtil;
