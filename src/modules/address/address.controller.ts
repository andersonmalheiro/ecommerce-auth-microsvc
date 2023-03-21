import { Prisma } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import errorHandler from 'util/error/error-handler';
import { AddressService } from './address.service';

@Controller()
export class AddressController {
  constructor(private addressService: AddressService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id') id: string, @Res() response: Response) {
    try {
      const res = await this.addressService.getById(parseInt(id));
      if (res) {
        return response.status(HttpStatus.OK).send(res);
      }
    } catch (error) {
      errorHandler(error, response);
    }
  }

  @Post()
  @HttpCode(201)
  public async create(
    @Param('userId') userId: string,
    @Body() data: Prisma.AddressCreateInput,
    @Res() response: Response,
  ) {
    try {
      return this.addressService.create(data, parseInt(userId));
    } catch (error) {
      errorHandler(error, response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateInput,
    @Res() response: Response,
  ) {
    try {
      const res = await this.addressService.update({ id: parseInt(id), data });
      if (res) {
        return response.status(HttpStatus.OK).send(res);
      }
    } catch (error) {
      errorHandler(error, response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: string, @Res() response: Response) {
    try {
      const res = await this.addressService.delete(parseInt(id));
      if (res) {
        return response.status(HttpStatus.OK).send();
      }
    } catch (error) {
      errorHandler(error, response);
    }
  }
}
