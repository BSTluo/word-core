import { allType, recycleBinList, wordData, wordUserConfig, wordUserData } from "../../word";

// 读取库
export const readDBFunction = async (dbName: 'wordUserData' | 'wordData' | 'recycleBinList' | 'wordUserConfig', key: string): Promise<allType> => {
  const readObjTemp = await database.get(dbName, key);
  if (readObjTemp.length <= 0) { return {}; }
  return readObjTemp[0].data as allType;
};

// 保存库
export const writeDBFunction = async (dbName: 'wordUserData' | 'wordData' | 'recycleBinList' | 'wordUserConfig', key: string, newData: allType): Promise<boolean> => {
  const readObjTemp = await database.get(dbName, key);
  if (readObjTemp.length <= 0) {

    await database.create(dbName, { id: key, data: newData } as unknown as wordUserData | wordData | recycleBinList | wordUserConfig);
    return true;
  } else {
    await database.set(dbName, key, { data: newData });
    return true;
  }
};

export const getDBFunction = async (dbName: 'wordUserData' | 'wordData' | 'recycleBinList' | 'wordUserConfig') => {

  const idListOrigin = await database.get(dbName, { id: { $regex: /^[\s\S]+$/ } }, ['id']);
  const dataListOrigin = await database.get(dbName, { id: { $regex: /^[\s\S]+$/ } }, ['data']);

  const data/*: dbCache*/ = {
    idList: idListOrigin.map(v => {
      return v.id;
    }),
    dataList: dataListOrigin.map((v) => {
      const temp = v.data as allType;
      return temp;
    })
  };

  return data;
};

export const removeDBFunction = async (dbName: 'wordUserData' | 'wordData' | 'recycleBinList' | 'wordUserConfig', key: string) => {
  database.remove(dbName, key);
};

export type readDBType = (dbName: 'wordUserData' | 'wordData' | 'recycleBinList' | 'wordUserConfig', key: string) => Promise<allType>;
export type writeDBType = (dbName: 'wordUserData' | 'wordData' | 'recycleBinList' | 'wordUserConfig', key: string, data: allType) => Promise<boolean>;
export type getDBType = (dbName: 'wordUserData' | 'wordData' | 'recycleBinList' | 'wordUserConfig') => Promise<{ idList: string[], dataList: allType[]; }>;
export type removeDBType = (dbName: 'wordUserData' | 'wordData' | 'recycleBinList' | 'wordUserConfig', key: string) => Promise<void>;

export interface ToolsFunction {
  readDB: readDBType;
  writeDB: writeDBType;
  getDB: getDBType;
  removeDB: removeDBType;
}