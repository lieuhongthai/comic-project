import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { queuePool } from 'src/bull-board-queue/bull-board-queue.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@UseInterceptors(LoggingInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectQueue('file-upload-queue') private fileQueue: Queue,
  ) {
    queuePool.add(fileQueue);
  }

  @Post('/uploadFile/csv')
  @UseInterceptors(
    FileInterceptor('csv', {
      storage: diskStorage({
        destination: './csv',
        fileName: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() =>
              Math.round(
                Math.random() *
                  cb(null, `${randomName}${extname(file.originalname)}`),
              ),
            );
        },
      }),
    }),
  )
  async uploadCsvFile(@UploadedFile() file) {
    const job = await this.fileQueue.add('csvfilejob', { file: file });
    console.log(`created job ${job.id}`);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
