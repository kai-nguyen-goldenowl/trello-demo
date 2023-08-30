import { Injectable, NestInterceptor, Type, mixin } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

interface LocalFilesInterceptorOptions {
  fieldName: string;
  path?: string;
  fileFilter?: MulterOptions['fileFilter'];
  limits?: MulterOptions['limits'];
}

export function LocalFilesInterceptor (options: LocalFilesInterceptorOptions): Type<NestInterceptor>{
  @Injectable()
  class Interceptor implements NestInterceptor {
    filesInterceptor: NestInterceptor;
    constructor(configService: ConfigService){
      const filesDestination = configService.get('UPLOAD_PATH');

      const destination = `${filesDestination}${options.path}`

      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
          filename: this.editFileName,
        }),
        fileFilter: options.fileFilter,
        limits: options.limits
      }

      this.filesInterceptor = new (FilesInterceptor(options.fieldName, undefined, multerOptions));
    }

    editFileName(req, file: Express.Multer.File, callback){
      const name = file.originalname.replace(/ /g, '-').split('.')[0];
      const fileExtName = '.'+file.originalname.split('.')[1];
      const currentDate = Date.now();
      callback(null, `${name}-${currentDate}${fileExtName}`);
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
        return this.filesInterceptor.intercept(...args);
    }
  }

  return mixin(Interceptor);
}
