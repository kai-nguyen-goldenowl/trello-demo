import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('local_file.delete')
  deleteLocalFile(@Payload('localFileId') localFileId: string) {
    return this.appService.deleteLocalFile(localFileId);
  }
}
