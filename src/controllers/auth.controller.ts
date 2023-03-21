import { Prisma } from '.prisma/client';
import { Body, Controller, HttpStatus, Patch, Post, Res } from '@nestjs/common';
import { RegisterUserDTO, RegisterUserSchema } from 'dto/register-user.dto';
import { UpdatePasswordDTO } from 'dto/update-password.dto';
import { Response } from 'express';
import { ZodError } from 'zod';
import { AuthService } from '../services/auth/auth.service';

@Controller()
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
      return response.status(HttpStatus.BAD_REQUEST).json({
        msg: (error as Error)?.message || 'Ops... Something whent wrong',
        stack: (error as Error)?.stack || '',
      });
    }
  }

  @Post('register')
  public async register(
    @Body() data: RegisterUserDTO,
    @Res() response: Response,
  ) {
    try {
      const parsedData = RegisterUserSchema.parse(data);
      const res = await this.authService.register(parsedData);

      return response.status(HttpStatus.CREATED).send(res);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorList = Object.entries(error.flatten().fieldErrors).map(
          ([key, message]) => ({
            key,
            message,
          }),
        );

        return response.status(HttpStatus.BAD_REQUEST).send({
          errors: errorList,
        });
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2002') {
          return response.status(HttpStatus.BAD_REQUEST).send({
            msg: 'Email already in use',
          });
        }
      }

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        msg: 'Ops... Something whent wrong',
        stack: (error as Error)?.stack || '',
      });
    }
  }

  @Patch('update_password')
  public async updatePassword(@Body() data: UpdatePasswordDTO) {
    return this.authService.updatePassword(data);
  }
}
