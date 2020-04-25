export interface AuthModel {
    token: string;
    user: AuthUserModel
}

export interface AuthUserModel {
    name: string;
    email: string;
    mobile: string;
    admin: boolean;
    public_id: string;
}