import { getDBType } from "..";
import { wordSaveData } from "../../word";

export const wordCache: WordCache = {
  hasKey: {}
};

export interface WordCache {
  hasKey: Record<string, string[]>;
}

export const getCache = async (getDBTools: getDBType) => {
  const { idList, dataList } = await getDBTools('wordData');
  const dataListTemp = dataList as wordSaveData[];

  dataListTemp.forEach((item: wordSaveData, index: number) => {
    const itemTemp = item.data;

    Object.keys(itemTemp).forEach(v => {
      if (!wordCache.hasKey[v]) { wordCache.hasKey[v] = []; }
      wordCache.hasKey[v].push(idList[index]);
    });
  });

  return wordCache;
};

// 标识某问题属于某词库
export const addCache = (q: string, wordName: string) => {
  if (Object.keys(wordCache.hasKey).includes(q)) {
    wordCache.hasKey[q].push(wordName);
  } else {
    wordCache.hasKey[q] = [wordName];
  }
};

// 取消标识某问题属于某词库
export const rmCache = (q: string, wordName: string) => {
  if (Object.keys(wordCache.hasKey).includes(q)) {
    const index = wordCache.hasKey[q].indexOf(wordName);
    wordCache.hasKey[q].splice(index, 1);
    if (wordCache.hasKey[q].length <= 0) { delete wordCache.hasKey[q]; }
  }
};

export type getCacheType = () => Promise<WordCache>;
export type rmCacheType = (q: string, wordName: string) => void;
export type addCacheType = (q: string, wordName: string) => void;

export interface CacheFunction {
  getCache: getCacheType;
  nowCache: WordCache;
  rmCache: rmCacheType;
  addCache: addCacheType;
}
