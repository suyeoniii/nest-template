import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  getUser(@Param('id') id: string): number {
    return this.userService.getAll(Number(id));
  }
}
