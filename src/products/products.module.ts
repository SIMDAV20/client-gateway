import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICES, envs } from 'src/config';

@Module({
  controllers: [ProductsController],
  imports: [
    ClientsModule.register([
      { name: PRODUCT_SERVICES, 
        transport: Transport.TCP,  
        options: {
          host: envs.productMicroserviceHost,
          port: envs.productMicroservicePort,
        }
      },
    ]),
  ]
})
export class ProductsModule { }
