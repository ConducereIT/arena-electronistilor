import { Leaderboard, Questions } from ".prisma/client";

export type typeLeaderBoardResponse = {
    status: string,
    leaderboard?: Leaderboard,
    errorMessage?: string,
    token?: string,
}

export type typeQuestionsResponse = {
    status: string,
    questions?: Questions,
    errorMessage?: string,
    token?: string,
}