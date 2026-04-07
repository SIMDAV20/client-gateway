import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct(@Body() body:any){
    return 'Crea un prod'
  }

  @Get()
  findAllProducts(){
    return 'Encuentra todos los productos'
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string){
    return `Encuentra un producto ${id}`
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() body:any,
  ){
    return `Actualiza un producto ${id}`
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string){
    return `Elimina un producto ${id}`
  }
}
