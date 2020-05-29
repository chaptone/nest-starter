import { Injectable } from '@nestjs/common';

export interface User {
    firstName: string,
    lastName: string,
    hobby: string,
}

@Injectable()
export class UserService {

    public getUser(): User {
        return {
            firstName: 'Tony',
            lastName: 'Stark',
            hobby: 'Iron Man',
        }
    }
}
