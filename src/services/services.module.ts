import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  exports: [PrismaModule, UsersModule],
})
export class ServicesModule {}
