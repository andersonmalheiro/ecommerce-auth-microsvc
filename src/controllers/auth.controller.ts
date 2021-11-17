import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { Prisma } from '.prisma/client';
import { IRegisterCustomerDTO } from 'dto/register-customer.dto';
import { UpdatePasswordDTO } from 'dto/update-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: Prisma.CustomerAuthCreateInput) {
    return this.authService.login(data);
  }

  @Post('register')
  async register(@Body() data: IRegisterCustomerDTO) {
    return this.authService.register(data);
  }

  @Patch('update_password')
  async updatePassword(@Body() data: UpdatePasswordDTO) {
    return this.authService.updatePassword(data);
  }
}
