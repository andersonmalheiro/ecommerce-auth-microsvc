import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

export interface UserListFilters {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: keyof User;
  sortOrder?: Prisma.SortOrder;
}

type UserOrderBy = Prisma.Enumerable<Prisma.UserOrderByWithRelationInput>;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async getById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        address: true,
      },
    });
  }

  public async list(params: UserListFilters): Promise<User[]> {
    const { orderBy, sortOrder, ...rest } = params;

    const orderByConfig: UserOrderBy = {};

    const filters: Prisma.UserFindManyArgs = {};

    Object.entries(rest).map(([key, value]) => {
      if (value) {
        if (['skip', 'take'].includes(key)) {
          filters[key] = parseInt(value as string);
        } else {
          filters[key] = value;
        }
      }
    });

    if (orderBy && sortOrder) {
      orderByConfig[orderBy] = sortOrder;
    }

    return this.prisma.user.findMany({
      ...filters,
      orderBy: orderByConfig,
    });
  }

  public async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  public async update(params: {
    id: number;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { id, data } = params;

    return this.prisma.user.update({
      data,
      where: {
        id: id,
      },
    });
  }

  public async delete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
