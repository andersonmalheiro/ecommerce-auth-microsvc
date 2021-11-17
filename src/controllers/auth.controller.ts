import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { Prisma } from '.prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: Prisma.CustomerAuthCreateInput) {
    return this.authService.login(data);
  }
}
