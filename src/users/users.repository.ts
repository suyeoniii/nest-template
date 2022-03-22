import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  insert(createUserDto: CreateUserDto) {
    return this.createQueryBuilder()
      .insert()
      .into(User)
      .values(createUserDto)
      .updateEntity(false)
      .execute();
  }
}
