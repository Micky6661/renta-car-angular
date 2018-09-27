import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { VehiculosComponent } from './modules/vehiculos/vehiculos.component';
import { VehiculoService } from './modules/vehiculos/vehiculo.service';
import { ClientesComponent } from './modules/clientes/clientes.component';
import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'vehiculos',component:VehiculosComponent},
  {path:'clientes',component:ClientesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    VehiculosComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [VehiculoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
