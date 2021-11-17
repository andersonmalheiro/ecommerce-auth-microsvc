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
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'services/auth/jwt-auth.guard';
import { UserService } from '../services/users/users.service';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(@Req() request: Request) {
    return this.customerService.list({ ...request.query });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id') id: string) {
    return this.customerService.getById(parseInt(id));
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() customer: Prisma.CustomerCreateInput) {
    return this.customerService.create(customer);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: Prisma.CustomerUpdateInput,
  ) {
    return this.customerService.update({ id: parseInt(id), data });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return this.customerService.delete(parseInt(id));
  }
}
