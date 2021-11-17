import { Prisma } from '.prisma/client';
import { Body, Controller, HttpStatus, Patch, Post, Res } from '@nestjs/common';
import { IRegisterCustomerDTO } from 'dto/register-customer.dto';
import { UpdatePasswordDTO } from 'dto/update-password.dto';
import { Response } from 'express';
import { AuthService } from '../services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  public async login(
    @Body() data: Prisma.CustomerAuthCreateInput,
    @Res() response: Response,
  ) {
    try {
      const token = await this.authService.login(data);

      if (token) {
        return response.status(HttpStatus.OK).send(token);
      }
    } catch (error) {
      console.log(error);

      return response.status(HttpStatus.BAD_REQUEST).json({
        msg: error.message,
      });
    }
  }

  @Post('register')
  public async register(@Body() data: IRegisterCustomerDTO) {
    return this.authService.register(data);
  }

  @Patch('update_password')
  public async updatePassword(@Body() data: UpdatePasswordDTO) {
    return this.authService.updatePassword(data);
  }
}
