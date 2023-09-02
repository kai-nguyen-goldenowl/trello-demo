import { Body, Controller, Delete, Get, Param, Res, StreamableFile, UseGuards } from '@nestjs/common';
import { LocalFileDto } from '@trello-demo/shared';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { JwtAuthGuard } from '../auth/guard';
import { LocalFileService } from './local-file.service';

@Controller('local-file')
@UseGuards(JwtAuthGuard)
export class LocalFileController {
  constructor(private readonly localFileService: LocalFileService) { }

  @Delete(':id')
  destroy(@Param('id') localFileId: string) {
    return this.localFileService.deleteLocalFile(localFileId);
  }

  @Get()
  getFIle(@Body() localFile: LocalFileDto, @Res({ passthrough: true }) response: Response) {
    const stream = createReadStream(join(process.cwd(), localFile.path))

    response.set({
      'Content-Disposition': `inline; filename="${localFile.filename}"`,
      'Content-Type': localFile.mimetype
    })

    return new StreamableFile(stream);
  }
}
