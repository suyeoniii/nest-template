import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const mockUserRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    const createArgs = {
      name: 'username',
      email: 'test@test.com',
      password: 'hashedPassword',
    };

    it('should create Users', async () => {
      userRepository.save.mockResolvedValue(createArgs);
      const result = await service.create(createArgs);

      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledWith(createArgs);
      expect(result).toEqual(createArgs);
    });
  });

  describe('findAll()', () => {
    it('should be find All', async () => {
      userRepository.find.mockResolvedValue([]);
      const result = await service.findAll();

      expect(userRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });
  });

  describe('findOne()', () => {
    const findOneArgs = { id: 1 };

    it('should be findOne', async () => {
      const mockedUser = {
        id: '1',
        name: 'username',
        email: 'test@test.com',
        password: 'hashedPassword',
      };
      userRepository.findOne.mockResolvedValue(mockedUser);
      const result = await service.findOne(findOneArgs.id);

      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toHaveBeenCalledWith(findOneArgs);
      expect(result).toEqual(mockedUser);
    });
  });

  describe('update()', () => {
    const findOneArgs = { id: 1 };
    const updateArgs = {
      id: '1',
      name: 'newname',
      email: 'test@test.com',
      password: 'hashedPassword',
    };

    it('should be update user', async () => {
      const oldUsers = {
        id: '1',
        name: 'username',
        email: 'test@test.com',
        password: 'hashedPassword',
      };
      const newUsers = {
        id: '1',
        name: 'newname',
        email: 'test@test.com',
        password: 'hashedPassword',
      };

      userRepository.findOne.mockResolvedValue(oldUsers);
      userRepository.save.mockResolvedValue(newUsers);

      const result = await service.update(findOneArgs.id, updateArgs);

      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toHaveBeenCalledWith(findOneArgs);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledWith({
        ...oldUsers,
        ...updateArgs,
      });

      expect(result).toEqual(newUsers);
    });
  });
});
