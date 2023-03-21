import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { ZodError } from 'zod';

export default function errorHandler(error: unknown, response: Response) {
  if (error instanceof ZodError) {
    const errorList = Object.entries(error.flatten().fieldErrors).map(
      ([key, message]) => ({
        key,
        message,
      }),
    );

    return response.status(HttpStatus.BAD_REQUEST).send({
      errors: errorList,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return response.status(HttpStatus.BAD_REQUEST).send({
        msg: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    if (error.code === 'P2025') {
      return response.status(HttpStatus.NOT_FOUND).send({
        msg: 'The requested resource doesn`t exist.',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  }

  return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
    msg: 'Ops... Something whent wrong',
    stack: (error as Error)?.stack || '',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  });
}
