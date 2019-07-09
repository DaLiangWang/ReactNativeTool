/**
 * FileName: RNFSUtils.js
 * Author: hf
 * Date: 2019/2/11 14:39
 * Description:封装对文件的【下载、文本写入、文本读取、文本追加、删除】的工具类方法
 *
 */
import RNFS from 'react-native-fs';


/** @namespace RNFS.ExternalDirectoryPath */
/**
 * 常用文件存储目录(ios与android)
 *
 * RNFS.MainBundlePath
 * RNFS.CachesDirectoryPath
 * RNFS.DocumentDirectoryPath
 * RNFS.TemporaryDirectoryPath
 * RNFS.LibraryDirectoryPath
 * RNFS.ExternalDirectoryPath
 * RNFS.ExternalStorageDirectoryPath
 */
const ExternalDirectoryPath = RNFS.ExternalDirectoryPath;
const CachesDirectoryPath = RNFS.CachesDirectoryPath;

const Path = {
  async Caches(targetName) {
    const toLoadPath = `${RNFS.CachesDirectoryPath}/File`;
    const isFileExBol = await isFileEx(toLoadPath);
    if (!isFileExBol) {
      await mkdir(CachesDirectoryPath, 'File');
      console.log("创建文件夹 : " + toLoadPath);
    }
    const indexFile = `${toLoadPath}/${targetName}`;
    console.log("保存文件路径 : " + indexFile);
    return indexFile;
  }
};


/** 文件下载(图片、文件、音频、视频) */
export const downloadFile = async (formUrl, targetName, progress, suc, fail) => {
  // 获取下载文件本地保存路径
  const toLoadPath = await Path.Caches(targetName);
  console.log("downloadFile 保存文件路径 : " + toLoadPath);

  const isFileExBol = await isFileEx(toLoadPath);
  if (isFileExBol) {
    console.log("读取缓存 : " + toLoadPath);
    suc(toLoadPath, null);
  } else {
    RNFS.downloadFile({
      fromUrl: formUrl,
      toFile: toLoadPath,
      progressDivider: 10,
      begin: (begin) => {
        console.log('begin = ', begin)
      },
      progress: (pro) => {
        progress(pro);
      }
    })
      .promise.then((res) => {
        suc(toLoadPath, res);
      })
      .catch((e) => {
        fail(e)
      });
  }
};


/**  删除本地文件 */
export const deleteFile = (targetName, callback) => {
  RNFS.unlink(`${ExternalDirectoryPath}/${targetName}`)
    .then(() => callback(1));
};

/**  判断文件是否存在  文件存在返回:true  不存在返回:false */
export const isFileEx = (filePath) => {
  return new Promise(function (resolve, reject) {
    try {
      RNFS.exists(filePath)
        .then(res => {
          resolve(res)
        });
    } catch (e) {
      reject(false);
    }
  });
};

/**  创建目录 */
export function mkdir(path, name) {
  return new Promise(function (resolve, reject) {
    try {
      const filePath = `${path}/${name}`;
      RNFS.mkdir(filePath)
        .then(res => {
          resolve(res)
        });
    } catch (e) {
      reject(false);
    }
  });
}




/**
 * 功能描述: <br>
 * 〈将内容写入本地文本〉
 *
 * @MethodName: _writeFile
 * @Author: hf
 * @Version: 1.0.0
 * @Date: 2019/2/11 14:47
 * @Param: [ targetName 目标文件名称(类似text.txt)  content 文本内容   callback: 1：成功 ]
 *
 */
export const _writeFile = (targetName, content, callback) => {
  const path = `${ExternalDirectoryPath}/${targetName}`;
  RNFS.writeFile(path, content, 'utf8')
    .then(result => callback(1));
};


/**
 * 功能描述: <br>
 * 〈读取文本内容〉
 *
 * @MethodName: _readFile
 * @Author: hf
 * @Version: 1.0.0
 * @Date: 2019/2/11 14:48
 * @Param: [fileName 文件名称，callback 回调函数获得读取的文件内容]
 *
 */
export const _readFile = (fileName, callback) => {
  RNFS.readFile(`${ExternalDirectoryPath}/${fileName}`)
    .then(result => callback(result));
};

/**
 * 功能描述: <br>
 * 〈在已有的txt上添加新的文本〉
 *
 * @MethodName: _appendFile
 * @Author: hf
 * @Version: 1.0.0
 * @Date: 2019/2/11 14:49
 * @Param: [fileName:要追加的目标文本名称, content 要添加的文本信息, callback:回调函数   1：成功]
 *
 */
export const _appendFile = (fileName, content, callback) => {
  RNFS.appendFile(`${ExternalDirectoryPath}/${fileName}`, content, 'utf8')
    .then(() => callback(1));
};
