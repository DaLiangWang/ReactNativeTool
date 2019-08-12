import RNFS from 'react-native-fs';
import Util from "../../util/Util";


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
    // const toLoadPath = `${RNFS.CachesDirectoryPath}`;
    const toLoadPath = Util.isAndroid() ? ExternalDirectoryPath : CachesDirectoryPath;
    const isFileExBol = await isFileEx(toLoadPath);
    if (!isFileExBol) {
      await mkdir(CachesDirectoryPath, 'File');
      console.log("创建文件夹 : " + toLoadPath);
    }
    const indexFile = `${toLoadPath}/${targetName}`;
    console.log("路径 : " + indexFile);
    return indexFile;
  }
};

/** 文件下载(图片、文件、音频、视频) */
export const downloadFile = async (formUrl, targetName, progress, suc, fail) => {
  console.log("下载文件地址 : " + formUrl);
  // 获取下载文件本地保存路径
  let toLoadPath = await Path.Caches(targetName);
  console.log("保存文件路径 : " + toLoadPath);

  console.log("检查本地缓存：" + toLoadPath);
  const isFileExBol = await isFileEx(toLoadPath);
  console.log("本地缓存结果：" + (isFileExBol ? "有缓存" : "没有缓存"));
  if (isFileExBol) {
    toLoadPath = Util.isAndroid() ? ("file://" + toLoadPath) : toLoadPath;
    console.log("读取缓存 : " + toLoadPath);
    suc(toLoadPath, null);
  } else {
    console.log("准备开始下载");
    RNFS.downloadFile({
      fromUrl: formUrl,
      toFile: toLoadPath,
      progressDivider: 1,
      begin: (begin) => {
        console.log('开始下载 ： ', begin)
      },
      progress: (res) => {
        let pro = res.bytesWritten / res.contentLength;
        console.log('下载进度 ： ', pro)
        progress(pro);
      }
    })
      .promise.then((res) => {
        toLoadPath = Util.isAndroid() ? ("file://" + toLoadPath) : toLoadPath;
        console.log('下载成功-图片路径 = ', toLoadPath);
        console.log('下载成功-结果 = ', res);
        suc(toLoadPath, res);
      })
      .catch((e) => {
        console.log('下载失败 = ', e)
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




// /**
//  * 将内容写入本地文本
//  */
// export const _writeFile = (targetName, content, callback) => {
//   const path = `${ExternalDirectoryPath}/${targetName}`;
//   RNFS.writeFile(path, content, 'utf8')
//     .then(result => callback(1));
// };


// /**
//  * 读取文本内容
//  */
// export const _readFile = (fileName, callback) => {
//   RNFS.readFile(`${ExternalDirectoryPath}/${fileName}`)
//     .then(result => callback(result));
// };

// /**
//  * 在已有的txt上添加新的文本
//  */
// export const _appendFile = (fileName, content, callback) => {
//   RNFS.appendFile(`${ExternalDirectoryPath}/${fileName}`, content, 'utf8')
//     .then(() => callback(1));
// };
