import { Prisma } from '.prisma/client';
import { Body, Controller, HttpStatus, Patch, Post, Res } from '@nestjs/common';
import { IRegisterUserDTO } from 'dto/register-user.dto';
import { UpdatePasswordDTO } from 'dto/update-password.dto';
import { Response } from 'express';
import { AuthService } from '../services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  public async login(
    @Body() data: Prisma.UserAuthCreateInput,
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
  public async register(
    @Body() data: IRegisterUserDTO,
    @Res() response: Response,
  ) {
    try {
      const res = await this.authService.register(data);
      return response.status(HttpStatus.CREATED).send(res);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2002') {
          return response.status(HttpStatus.BAD_REQUEST).send({
            msg: 'Email already in use',
          });
        }
      }
    }
  }

  @Patch('update_password')
  public async updatePassword(@Body() data: UpdatePasswordDTO) {
    return this.authService.updatePassword(data);
  }
}
