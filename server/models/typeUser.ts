export type User = {
    email: string,
    token: string,
}

export type LoginResponse = {
    status: string,
    user?: User,
    token?: string,
    errorMessage?: string,
}

export type RegisterResponse = {
    status: string,
    user?: User,
    token?: string,
    errorMessage?: string,
}

export type SessionResponse = {
    status: string,
    errorMessage?: string;
}