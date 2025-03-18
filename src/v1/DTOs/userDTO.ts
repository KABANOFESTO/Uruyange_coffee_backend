export interface User {
    id?: string;
    email: string;
    password: string;
    role?: string;
    createdAt?: Date;
}

export interface CreateUserDTO {
    email: string;
    password: string;
    role: string;
}

export interface GetUserDTO {
    id: string;
    email: string;
    role: string;
    createdAt: Date;
}

const userDTO = {
    createUserDTO: (user: User): CreateUserDTO => ({
        email: user.email,
        password: user.password,
        role: user.role || 'user',
    }),

    getUserDTO: (user: User): GetUserDTO => ({
        id: user.id!,
        email: user.email,
        role: user.role!,
        createdAt: user.createdAt!,
    })
};

export default userDTO;