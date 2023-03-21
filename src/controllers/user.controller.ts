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

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(@Req() request: Request) {
    return this.userService.list({ ...request.query });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id') id: string) {
    return this.userService.getById(parseInt(id));
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() user: Prisma.UserCreateInput) {
    return this.userService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateInput,
  ) {
    return this.userService.update({ id: parseInt(id), data });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return this.userService.delete(parseInt(id));
  }
}
