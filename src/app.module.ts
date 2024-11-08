
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the environment variables accessible globally
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get<string>('DB_USERNAME')}:${configService.get<string>('DB_PASSWORD')}@cluster0.g03cm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      }),
    }),
    UserModule,
    // AuthModule,
  ],
  controllers:[AppController],
  providers:[AppService]
})
export class AppModule {}
