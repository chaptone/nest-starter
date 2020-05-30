import { Injectable } from '@nestjs/common';

export interface User {
    id: number,
    username: string,
    password: string
    firstName: string,
    lastName: string,
    hobby: string,
}

@Injectable()
export class UserService {
    private readonly users: User[];

    constructor() {
        this.users = [
            {
                id: 1,
                username: 'stark',
                password: 'javis',
                firstName: 'Robert',
                lastName: 'Downey jr.',
                hobby: 'Being Iron Man!',
            },
            {
                id: 2,
                username: 'thor',
                password: 'secret',
                firstName: 'Chris',
                lastName: 'Hemsworth',
                hobby: 'Being Thor!'
            },
            {
                id: 3,
                username: 'spiderman',
                password: 'guess',
                firstName: 'Tom',
                lastName: 'Holland',
                hobby: 'Being Spider Man!'
            },
        ]
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async find(): Promise<User[]> {
        return this.users;
    }
}