import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private static readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const result = await this.userRepository.save(createUserDto);
      UsersService.logger.debug(result);
      return result;
    } catch (error) {
      UsersService.logger.debug(error);
      throw error;
    }
  }
  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      UsersService.logger.debug(users);
      return users;
    } catch (error) {
      UsersService.logger.debug(error);
      throw error;
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        id,
      });
      UsersService.logger.debug(user);
      if (!user) {
        throw new EntityNotFoundError(User, id);
      }
      return user;
    } catch (error) {
      UsersService.logger.debug(error);
      throw error;
    }
  }

  async update(id: number, updatePostDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        id,
      });
      if (!user) {
        throw new EntityNotFoundError(User, id);
      }
      UsersService.logger.debug(user);
      const result = await this.userRepository.save({
        ...user,
        ...updatePostDto,
      });
      return result;
    } catch (error) {
      UsersService.logger.debug(error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOne({
        id,
      });
      if (!user) {
        throw new EntityNotFoundError(User, id);
      }
      UsersService.logger.debug(user);
      const result = await this.userRepository.softDelete({
        id,
      });
      return result;
    } catch (error) {
      UsersService.logger.debug(error);
      throw error;
    }
  }
}
