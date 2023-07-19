import { Module } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { RepositoriesController } from './repositories.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RepositoriesController],
  providers: [RepositoriesService],
})
export class RepositoriesModule {}
