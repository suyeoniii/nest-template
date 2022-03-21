import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, getCustomRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  private static readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository = getCustomRepository(UsersRepository),
  ) {}

  async create(createUserDto: CreateUserDto): Promise<number> {
    try {
      const result = await this.userRepository.insert(createUserDto);
      UsersService.logger.debug(result);
      return result.raw.insertId;
    } catch (error) {
      UsersService.logger.debug(error);
      throw error;
    }
  }
  async checkEmail(createUserDto: CreateUserDto): Promise<boolean> {
    try {
      const user = await this.userRepository.findAndCount({
        email: createUserDto.email,
      });
      UsersService.logger.debug(user);
      console.log(user);
      return !Boolean(user);
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
