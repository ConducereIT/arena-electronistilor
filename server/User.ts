import jwt from "jsonwebtoken";


import { PrismaClient } from "@prisma/client";
import { LoginResponse, RegisterResponse } from "./models/typeUser";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { randomUUID } from "crypto";

export class User{
    prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();

        if (this.prisma){
            console.log("Connected");
        }
        else {
            console.log("Database error");
        }
    }

    async validatePassword(saltedPassword: string, password: string) : Promise<boolean> {
        return new Promise( (resolve) => {
            bcrypt.compare(password, saltedPassword,async (err, res) => {
                if (err){
                    throw err;
                }

                if (res){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
            })
        }) 
    }

    async hashPassword(password: string): Promise<string> {
        return new Promise((resolve) => {
          bcrypt.genSalt(10, function (err, salt) {
            if (err) {
              throw err;
            }
      
            bcrypt.hash(password, salt, async function (err, hash) {
              if (err) {
                throw err;
              }
      
              resolve(hash);
            });
          });
        });
      }
      

    async login (email: string, password: string) : Promise<LoginResponse>{
        try {
          const existingUser = await this.prisma.user.findUnique({where: {email: email}}).catch(error => {
            console.error(error);
            return null;
          });

          if (!existingUser) {
            throw new Error("Try again! Email or password is invalid ...")
          }

          const isValid = await this.validatePassword(existingUser.password, password);

          if (!isValid){
            throw new Error("Password is incorect!");
          }

        const token = jwt.sign(existingUser, process.env.JWT_TOKEN_SECRET!, {expiresIn: 86400});

          
        await this.prisma.session.create({
            data: {
              id: existingUser.id,
              email: existingUser.email,
              token: token,
            }});      

        

        return {status: "ok",
         user:{
          email: existingUser.email,
          token: token,
        },
        token: "token"};
        } catch (error) {

          return {
            status: "error",
            errorMessage: `${error}`,
          };
        }
    }

    async register (email: string, password: string) : Promise<RegisterResponse> {
      try {
        const existingUser = await this.prisma.user.findUnique({where: {email: email}}).catch( (error) => {
          console.log(error);
        });

        if (existingUser){
          throw new Error("An account is already created using this email address. Please pick another one.")
        }

        const hashPassword = await this.hashPassword(password);

        const token = uuidv4();

        const newUser = await this.prisma.user.create(
          {data:
            {
              email: email,
              password: hashPassword,
            }
          }
        );

        if (!newUser){
          throw new Error("error");
        }

        return {
          status: "ok", 
          user: 
          {
            email: email,
            token: token,
          }, 
          token: token,
        };
        
      } catch (error) {
        return {
          status: "error",
          errorMessage: `${error}`,
        }
      }
    }

}

