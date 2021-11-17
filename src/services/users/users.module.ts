import { Module } from '@nestjs/common';
import { PrismaModule } from 'services/prisma/prisma.module';
import { UserService } from './users.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
