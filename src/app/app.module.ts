import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { VehiculosComponent } from './modules/vehiculos/vehiculos.component';
import { VehiculosCreateComponent } from './modules/vehiculos/vehiculos-create.component';
import { VehiculoService } from './modules/vehiculos/vehiculo.service';

import { ClientesComponent } from './modules/clientes/clientes.component';
import { ClientesCreateComponent } from './modules/clientes/clientes-create.component';

import { RouterModule, Routes} from '@angular/router';
import {DataTableModule} from "angular-6-datatable";


const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},

  {path:'vehiculos',component:VehiculosComponent},
  {path:'vehiculos/create',component:VehiculosCreateComponent},

  {path:'clientes',component:ClientesComponent},
  {path:'clientes/create',component:ClientesCreateComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

    VehiculosComponent,
    VehiculosCreateComponent  ,
    
    ClientesComponent,
    ClientesCreateComponent
  ],
  imports: [
    BrowserModule,
    DataTableModule,
    RouterModule.forRoot(routes)
  ],
  providers: [VehiculoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
