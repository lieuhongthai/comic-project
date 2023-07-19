import { Inject, Injectable } from '@nestjs/common';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { UpdateRepositoryDto } from './dto/update-repository.dto';
import { userEntity } from 'src/core/constants';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class RepositoriesService {
  @Inject(userEntity)
  private userEntity: typeof User;
  create(createRepositoryDto: CreateRepositoryDto) {
    return 'This action adds a new repository';
  }

  async findAll() {
    return await this.userEntity.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} repository`;
  }

  update(id: number, updateRepositoryDto: UpdateRepositoryDto) {
    return `This action updates a #${id} repository`;
  }

  remove(id: number) {
    return `This action removes a #${id} repository`;
  }
}
