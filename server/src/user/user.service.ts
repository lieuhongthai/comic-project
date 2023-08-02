import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/database/repositories/user/user.repository';
import { LoggerService } from 'src/loggers/logger.service';
import { Log4jsLogger } from '@nestx-log4js/core';

@Injectable()
export class UserService {
  // Inject repository
  @Inject(UserRepository)
  private userRepository: UserRepository;

  constructor(
    private loggerService: LoggerService,
    private logger: Log4jsLogger,
  ) {
    this.loggerService.setContext(UserService.name);
  }

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.createdOne(createUserDto);
    return user;
  }

  createUser(data: any) {
    console.log(12005, 'createUser', data);

    return data;
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    this.logger.log('11111111111111111111', UserService.name);

    // throw new HttpException('message', 401);
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, _updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
