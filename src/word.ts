import { wordService } from './Service/index';
import { wordDriver } from "./Driver/Driver";

export class word {
    wordService: wordService;
    wordDriver: wordDriver;

    constructor() {
        this.wordDriver = new wordDriver();
        this.wordService = new wordService();
    }
}

export type allType = wordSaveData | Record<string, string> | Record<string, Record<string, number>>;

export type DBTypeList = {
    wordUserData: wordUserData;
    wordData: wordData;
    recycleBinList: recycleBinList;
    wordUserConfig: wordUserConfig;
};

export interface wordSaveData {
    saveDB: string;
    author: string[];
    data: Record<string, string[]>;
}

export interface wordUserConfig {
    id: string;
    data: Record<string, string[]>;
}

export interface wordUserData {
    id: string;
    data: Record<string, Record<string, number>>;
}

export interface wordData {
    id: string;
    data: wordSaveData;
}

export interface recycleBinList {
    id: string;
    data: wordSaveData;
}