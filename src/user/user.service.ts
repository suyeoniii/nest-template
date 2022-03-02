import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getAll(userIdx: number): number {
    return userIdx;
  }
}
