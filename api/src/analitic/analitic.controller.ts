import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AnaliticService } from './analitic.service';
import { TokenAuthGuard } from 'src/auth/token-auth.guard';

@Controller('analitics')
export class AnaliticController {
  constructor(private readonly analiticService: AnaliticService) {}
  @UseGuards(TokenAuthGuard)
  @Get('/week/:wallet')
  getDataForWeek(@Param('wallet') wallet: string, @Req() req: Request) {
    return this.analiticService.getDataForWeek(wallet, req.user.toString());
  }

  @UseGuards(TokenAuthGuard)
  @Get('/mounth/:wallet')
  getDataForMounth(@Param('wallet') wallet: string, @Req() req: Request) {
    return this.analiticService.getDataForMounth(wallet, req.user.toString());
  }
}
