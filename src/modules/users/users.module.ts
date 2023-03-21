import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from 'modules/prisma/prisma.module';
import { UserService } from './users.service';

@Module({
  controllers: [UserController],
  imports: [PrismaModule],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
