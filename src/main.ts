import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/exception.filter';
import { AppModule } from './modules/app.module';

// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  // const options =
  //   new DocumentBuilder()
  //     .setTitle('Nest JS - Api 1.0.0')
  //     .setDescription('Servidor REST Api 1.0.0')
  //     .build()

  // const document = SwaggerModule.createDocument(app, options)

  // SwaggerModule.setup('api', app, document)

  await app.listen(80);
}
bootstrap();
