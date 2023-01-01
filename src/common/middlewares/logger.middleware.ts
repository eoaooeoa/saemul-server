import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    Logger.log(`${req.method} ${req.originalUrl}`);
    next();
  }
}
