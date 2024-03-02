export interface LoginRequest {
    userName: string,
    password:  string
}

export interface LoginResponse {
    userName: string,
    token:  string,
}