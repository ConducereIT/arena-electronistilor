/**
* This is an auto generated code. This code should not be modified since the file can be overwritten
* if new genezio commands are executed.
*/

import { Remote } from "./remote";
import { LoginResponse, RegisterResponse } from "./models/typeUser";


export class User {
  static remote = new Remote("http://127.0.0.1:8083/User");

  static async validatePassword(saltedPassword: string, password: string): Promise<boolean> {
    return await User.remote.call("User.validatePassword", saltedPassword, password);
  }
  static async hashPassword(password: string): Promise<string> {
    return await User.remote.call("User.hashPassword", password);
  }
  static async login(email: string, password: string): Promise<LoginResponse> {
    return await User.remote.call("User.login", email, password);
  }
  static async register(email: string, password: string): Promise<RegisterResponse> {
    return await User.remote.call("User.register", email, password);
  }
}

export { Remote };
