import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { PRODUCT_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  createProduct(@Body() body:any){
    return this.productsClient.send({ cmd: 'create_product' }, body)
  }

  @Get()
  findAllProducts(
    @Query() paginationDto: PaginationDto
  ){
    return this.productsClient.send({ cmd: 'find_all_products' }, paginationDto)
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: string){
    try {
      const product = await  firstValueFrom(this.productsClient.send(
        { cmd: 'find_one_product' }, {id}
      ))
      return product;

    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() body:any,
  ){
    return this.productsClient.send({ cmd: 'update_product' }, {id, ...body})
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string){
    return this.productsClient.send({ cmd: 'delete_product' }, {id})
  }
}
