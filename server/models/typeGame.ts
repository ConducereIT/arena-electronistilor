import { Leaderboard, Questions } from ".prisma/client";

export type typeLeaderBoardResponse = {
    status: string,
    leaderboard?: Leaderboard,
    errorMessage?: string,
}

export type typeQuestionsResponse = {
    status: string,
    questions?: Questions,
    errorMessage?: string,
}

export type ResponseGetNumberQuestions = {
    status: string,
    numberQuestions?: number,
    errorMessage?: string,
}

export type GetAnswersQuickRound = {
    status: string, 
    answers?: Answers,
    errorMessage?: string,
}

export type UpdateQuickRoundResponse = {
    status: string,
    errorMessage?: string,
}


export type Answers = {
    text: string, 
    score: number, 
};