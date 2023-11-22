import { PrismaClient } from ".prisma/client";
import { typeLeaderBoardResponse, typeQuestionsResponse } from "./models/typeGame";
import { error } from "console";
import { SessionResponse } from "./models/typeUser";

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

        } catch (error) {
            return {
                status: "error",
                errorMessage: `${error}`,
              };
        }
    }

    async getQuestion (token: string, questionId: number) : Promise<typeQuestionsResponse>{
        try{
            return {
                status: "ok",
                
            }
        }catch(error){
            return {
                status: "error",
                errorMessage: `${error}`
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
}