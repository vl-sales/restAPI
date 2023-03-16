import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { UsuarioModule } from './user/user.module';


@Module({
  imports: [UsuarioModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
