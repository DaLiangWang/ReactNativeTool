import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import sync from './sync';
// import storageTools from './storageTools';

const storageManager = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 24 * 60 * 60 * 1000,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true, // 你可以在构造函数这里就写好sync的方法 // 或是在任何时候，直接对storage.sync进行赋值修改 // 或是写到另一个文件里，这里require引入

  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // sync: require('./sync'),
  // tools: storageTools
});


const storageTools = {
  /** 保存数据
   *  key:保存数据的Key
   *  id:每个相同key下可保存多条不同id的数据，默认1000 ，在配置中配置
   *  time:过期时间，默认在配置中
   */
  save(key, value, time = null) {
    storageTools.saveId(key,"",value,time);
  },
  saveId(key, id, value, time = null) {
    storageManager.save({
      key: key, // 注意:请不要在key中使用_下划线符号!
      id: id, // 注意:请不要在id中使用_下划线符号!
      data: value, 
      // 如果不指定过期时间，则会使用defaultExpires参数
      // 如果设为null，则永不过期
      expires: time,
    });
  },

  remove(key) {
    storageTools.removeId(key,"");
  },
  removeId(key, id) {
    storageManager.remove({
      key: key, // 注意:请不要在key中使用_下划线符号!
      id: id, // 注意:请不要在id中使用_下划线符号!
    });
  },

  load(key){
    return storageTools.loadId(key,"");
  },
  loadId(key, id) {
    return new Promise(function (resolve, reject) {
      try {
        // 读取
        storageManager.load({
          key: key,
          id: id,
          // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
          autoSync: true, // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
          // syncInBackground(默认为true)意味着如果数据过期，
          // 在调用sync方法的同时先返回已经过期的数据。
          syncInBackground: false,
          // 你还可以给sync方法传递额外的参数
          syncParams: {
            extraFetchOptions: {
              // 各种参数
            },
            someFlag: true,
          },
        })
          .then(ret => {
            resolve(ret);
          })
          .catch(err => {
            //如果没有找到数据且没有sync方法，
            resolve(err);
          });
      } catch (e) {
        resolve(null);
      }
    });
  }
};




storageManager.sync = sync;
// storage.tools = storageTools;
global.storageManager = storageManager;
global.storage = storageTools;
