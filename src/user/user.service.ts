import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class UserService {
  async getOne(userIdx: number): Promise<User> {
    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.id = :id', { id: userIdx })
      .getOne();
    return user;
  }
}
