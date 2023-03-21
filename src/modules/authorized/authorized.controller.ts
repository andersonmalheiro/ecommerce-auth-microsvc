import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';

@Controller('authorized')
export class AuthorizedController {
  @Get()
  @UseGuards(JwtAuthGuard)
  async index(@Request() req): Promise<{ userId: number }> {
    return { userId: req.user.userId };
  }
}
