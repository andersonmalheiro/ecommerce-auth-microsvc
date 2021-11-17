import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Customer } from '@prisma/client';

export interface CustomerListFilters {
  skip?: number;
  take?: number;
  cursor?: Prisma.CustomerWhereUniqueInput;
  where?: Prisma.CustomerWhereInput;
  orderBy?: keyof Customer;
  sortOrder?: Prisma.SortOrder;
}

type CustomerOrderBy =
  Prisma.Enumerable<Prisma.CustomerOrderByWithRelationInput>;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async getById(id: number): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async list(params: CustomerListFilters): Promise<Customer[]> {
    const { orderBy, sortOrder, ...rest } = params;

    const orderByConfig: CustomerOrderBy = {};

    const filters: Prisma.CustomerFindManyArgs = {};

    Object.entries(rest).map(([key, value]) => {
      if (value) {
        if (['skip', 'take'].includes(key)) {
          filters[key] = parseInt(value);
        } else {
          filters[key] = value;
        }
      }
    });

    if (orderBy && sortOrder) {
      orderByConfig[orderBy] = sortOrder;
    }

    return this.prisma.customer.findMany({
      ...filters,
      orderBy: orderByConfig,
    });
  }

  public async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.prisma.customer.create({
      data,
    });
  }

  public async update(params: {
    id: number;
    data: Prisma.CustomerUpdateInput;
  }): Promise<Customer> {
    const { id, data } = params;

    return this.prisma.customer.update({
      data,
      where: {
        id: id,
      },
    });
  }

  public async delete(id: number): Promise<Customer> {
    return this.prisma.customer.delete({
      where: {
        id: id,
      },
    });
  }
}
