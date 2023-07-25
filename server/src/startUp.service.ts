import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { RoleRepository } from './database/repositories/role/role.repository';

@Injectable()
export class AppService implements OnModuleInit {
  @Inject(RoleRepository)
  private roleRepository: RoleRepository;

  async onModuleInit() {
    await this.roleRepository.dumpData();
    console.log(`The module has been initialized.`);
  }

  // onApplicationShutdown(signal: string) {
  //   console.log(signal); // e.g. "SIGINT"
  // }
}
