import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.userService.getOne(Number(id));
  }
}
