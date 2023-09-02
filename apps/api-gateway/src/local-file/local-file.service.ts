import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class LocalFileService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('LOCAL_FILE_MICROSERVICE') private readonly client: ClientKafka){}

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  deleteLocalFile(localFileId: string) {
    return this.client.emit('local_file.delete', {localFileId: localFileId })
  }
}
