/**
* This is an auto generated code. This code should not be modified since the file can be overwritten
* if new genezio commands are executed.
*/

import { Remote } from "./remote";


export class HelloWorldService {
  static remote = new Remote("http://127.0.0.1:8083/HelloWorldService");

  static async hello(name: string): Promise<string> {
    return await HelloWorldService.remote.call("HelloWorldService.hello", name);
  }
  static async gof(name: string): Promise<string> {
    return await HelloWorldService.remote.call("HelloWorldService.gof", name);
  }
}

export { Remote };
