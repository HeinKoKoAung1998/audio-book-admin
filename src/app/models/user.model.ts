export enum UserRole {
    Admin = 'Admin',
    User = 'User'
};
export enum AuthProvider {
    Google = 'Google',
    Email = 'Email'
};

export interface User {
    user_id : number;
    name : string;
    email : string;
    role : UserRole;
    auth_provider? : AuthProvider;
    expiresIn : Date;
};


