import * as Tools from './Tools/Tools';
import * as User from './User/User';
import * as Cache from "./Editor/Cache";
import * as Editor from './Editor/Editor';
import * as trigger from "../extend/trigger";

export * from './Tools/Tools';
export * from './Editor/Cache';

export * from './Editor/Cache';

export class wordService {

  public Tools: Tools.ToolsFunction = {} as Tools.ToolsFunction;

  public User: User.UserFunction = {} as User.UserFunction;

  public Cache: Cache.CacheFunction = {} as Cache.CacheFunction;

  public Editor: Editor.Editor;

  public trigger: trigger.triggerType = trigger.trigger;

  constructor() {
    this.Tools.readDB = (dbName, key) => { return Tools.readDBFunction(dbName, key); };
    this.Tools.writeDB = (dbName, key, data) => { return Tools.writeDBFunction(dbName, key, data); };
    this.Tools.getDB = (dbName) => { return Tools.getDBFunction(dbName); };
    this.Tools.removeDB = async (dbName, key) => { return Tools.removeDBFunction(dbName, key); };

    this.User.getData = (uid) => { return User.getData(this.Tools.readDB, uid); };
    this.User.updateData = (uid, data) => { return User.updateData(this.Tools.writeDB, uid, data); };
    this.User.getItem = (uid, cell, item) => { return User.getItem(this.Tools.readDB, uid, cell, item); };
    this.User.updateItem = (uid, cell, itemName, amount) => { return User.updateItem(this.Tools.readDB, this.Tools.writeDB, uid, cell, itemName, amount); };

    this.Cache.getCache = () => { return Cache.getCache(this.Tools.getDB); };
    this.Cache.nowCache = Cache.wordCache;
    this.Cache.rmCache = Cache.rmCache;
    this.Cache.addCache = Cache.addCache;

    this.Editor = new Editor.Editor(this.Tools.readDB, this.Tools.writeDB, this.Tools.getDB, this.Tools.removeDB, this.Cache.addCache, this.Cache.rmCache);
  }
}