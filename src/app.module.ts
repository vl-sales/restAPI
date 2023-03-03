import { Module } from '@nestjs/common';
import { produtosModule } from './produtos/produtos.module';
import { UsuarioModule } from './usuario/usuario.module';


@Module({
  imports: [UsuarioModule, produtosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
