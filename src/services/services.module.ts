import { Module } from '@nestjs/common';
import { AddressModule } from './address/address.module';
import { PrismaModule } from './prisma/prisma.module';

import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, UsersModule, AddressModule],
  exports: [PrismaModule, UsersModule, AddressModule],
})
export class ServicesModule {}
