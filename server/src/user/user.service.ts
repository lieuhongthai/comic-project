import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/database/repositories/user/user.repository';

@Injectable()
export class UserService {
  // Inject repository
  @Inject(UserRepository)
  private userRepository: UserRepository;

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.createdOne(createUserDto);
    return user;
  }

  async findAll() {
    const users = await this.userRepository.findAll();

    console.log(12005, users);

    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
