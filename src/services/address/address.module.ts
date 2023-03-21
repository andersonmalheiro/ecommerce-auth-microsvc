import { Module } from '@nestjs/common';
import { AddressController } from 'controllers/address.controller';
import { PrismaModule } from 'services/prisma/prisma.module';
import { AddressService } from './address.service';

@Module({
  controllers: [AddressController],
  imports: [PrismaModule],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
