import { Controller, Get } from '@nestjs/common';

@Controller('unauthorized')
export class UnauthorizedController {
  @Get()
  async index(): Promise<boolean> {
    return true;
  }
}
