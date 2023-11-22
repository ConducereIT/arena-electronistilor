import { PrismaClient } from ".prisma/client";
import { GetAnswersQuickRound, ResponseGetNumberQuestions, UpdateQuickRoundResponse, typeLeaderBoardResponse, typeQuestionsResponse } from "./models/typeGame";
import { error } from "console";
import { SessionResponse } from "./models/typeUser";
import { ok } from "assert";

export class Game {
    prisma: PrismaClient;

    constructor () {
        this.prisma = new PrismaClient();

        if (this.prisma){
            console.log("Connected");
        }
        else {
            console.log("Database error");
        }
    }

    async getLeaderboard (token: string) : Promise<typeLeaderBoardResponse> {
        try {
            
            const isValid = await this.checkSession(token);

            if (isValid.status == "error"){
                throw new Error("Invalid Session!");
            }

            const table = await this.prisma.leaderboard.findMany();

            if (!table){
                throw new Error ("Leaderboard is invalid!");
            }

            const rows = table.map( (event) => {
                const id = event.id; 
                const teamName = event.playerName;
                const teamScore = event.score;

                return {
                    status: "ok",
                    token: token,
                    leaderboard: [id, teamName, teamScore],
                }
            })

            return {
                status: "ok",
            }

        } catch (error) {
            return {
                status: "error",
                errorMessage: `${error}`,
              };
        }
    }

    async getQuestion (token: string, questionId: number) : Promise<typeQuestionsResponse>{
        try{
            const isValid = await this.checkSession(token);

            if (isValid.status == "error"){
                throw new Error(isValid.errorMessage);
            }

            const question = await this.prisma.questions.findFirst({where: {id: questionId}}).catch( (error) => {
                console.log(error);
                throw new Error ("Invalid Question!");
            })

            question?.answer?.map ( (event) => {
                return {
                    status: "ok",
                    questions: [question.question, event],
                    token: token,
                }
            })


            return {
                status: "ok",
            }
        }catch(error){
            return {
                status: "error",
                errorMessage: `${error}`,
            }
        }
    }

    async checkSession (token: string) : Promise<SessionResponse>{
        try {
            if (!token){
                throw new Error("Token is invalid");
            }

            const activeSession = await this.prisma.session.findFirst({
                where: { token: token.slice(1, token.length - 1) },
              });

            if (!activeSession){
                throw new Error("Session expired!");
            }

            const user = await this.prisma.user.findUnique({where: {email: activeSession.email}}).catch (error => {
                console.log(error);
                throw new Error("Invalid Session!");
            })

              return {status: "ok"};
        } catch (error) {
            return {
                status: "error",
                errorMessage: `${error}`
            }
        }
    }

    async getNumberQuestions (token: string) : Promise<ResponseGetNumberQuestions> {
        try{

            const isValid = await this.checkSession(token);

            if (isValid.status == "error"){
                throw new Error ("Invalid Session!");
            }

            const counter = await this.prisma.questions.count().catch( error => {
                console.log(error);
                throw new Error (error);
            })

            return {
                status: "ok",
                numberQuestions: counter,
            }
        }catch ( error ){
            return {
                status: "error",
                errorMessage: `${error}`,
            }
        }
    }

    async getAnswersQuickRound (token: string) : Promise<GetAnswersQuickRound>{
        try {
            const isValid = await this.checkSession(token);

            if (isValid.status == "error"){
                throw new Error (isValid.errorMessage);
            }

            const table = await this.prisma.quickRound.findMany();

            table.map( (event) => {
                return {
                    status: "ok",
                    answer: [event.id, event.teamName, event.teamScore]
                }
            })

            return {
                status: "ok",
            }
        } catch (error) {
            return {
                status: "error",
                errorMessage: `${error}`
            }
        }
    }
    
    async updateQuickRound (ceva: string[] ,token: string) : Promise<UpdateQuickRoundResponse> {
        try{

            const isValid = await this.checkSession(token);

            if (isValid.status == "error"){
                throw new Error(isValid.errorMessage);
            }

            // await this.prisma.quickRound.update(ceva);

            return {
                status: "ok",
            }

        }catch (error){
            return {
                status: "error",
                errorMessage: `${error}`,
            }
        }
    }
}