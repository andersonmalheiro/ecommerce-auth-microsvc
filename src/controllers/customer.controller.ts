import { Prisma } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  CustomerListFilters,
  UserService,
} from '../services/users/users.service';
import { Request } from 'express';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: UserService) {}

  @Get()
  async index(@Req() request: Request) {
    return this.customerService.list({ ...request.query });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.customerService.getById(parseInt(id));
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() customer: Prisma.CustomerCreateInput) {
    return this.customerService.create(customer);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: Prisma.CustomerUpdateInput,
  ) {
    return this.customerService.update({ id: parseInt(id), data });
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return this.customerService.delete(parseInt(id));
  }
}
