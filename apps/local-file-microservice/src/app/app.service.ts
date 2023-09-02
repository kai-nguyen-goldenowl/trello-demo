import { Injectable } from '@nestjs/common';
import { LocalFilesService } from '@trello-demo/data-access-local-files';

@Injectable()
export class AppService {
  constructor(private readonly localFileService: LocalFilesService) {}

  deleteLocalFile(localFileId: string) {
    return this.localFileService.delete(localFileId)
  }
}
