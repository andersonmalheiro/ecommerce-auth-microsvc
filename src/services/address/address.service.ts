import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Address } from '@prisma/client';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  public async getById(id: number): Promise<Address | null> {
    return this.prisma.address.findFirstOrThrow({
      where: {
        id: id,
      },
    });
  }

  public async create(
    data: Omit<Prisma.AddressCreateInput, 'user'>,
    userId: number,
  ): Promise<Address> {
    return this.prisma.address.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  public async update(params: {
    id: number;
    data: Omit<Prisma.AddressUpdateInput, 'user'>;
  }): Promise<Address> {
    const { id, data } = params;

    return this.prisma.address.update({
      data,
      where: {
        id: id,
      },
    });
  }

  public async delete(id: number): Promise<Address> {
    return this.prisma.address.delete({
      where: {
        id: id,
      },
    });
  }
}
