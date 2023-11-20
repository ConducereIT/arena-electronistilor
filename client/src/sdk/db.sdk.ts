/**
* This is an auto generated code. This code should not be modified since the file can be overwritten
* if new genezio commands are executed.
*/

import { Remote } from "./remote";


export class Db {
  static remote = new Remote("http://127.0.0.1:8083/Db");

  static async ghahd(name: string): Promise<string> {
    return await Db.remote.call("Db.ghahd", name);
  }
}

export { Remote };
