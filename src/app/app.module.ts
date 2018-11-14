import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

/**Components imports**/
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { VehiculosComponent } from './modules/vehiculos/controllers/vehiculos.component';
import { VehiculosFormComponent } from './modules/vehiculos/controllers/vehiculos-form.component';

import { ClientesComponent } from './modules/clientes/controllers/clientes.component';
import { ClientesFormComponent } from './modules/clientes/controllers/clientes-form.component';

import { RentasComponent } from './modules/rentas/controllers/rentas.component';
import { RentasFormComponent } from './modules/rentas/controllers/rentas-form.component';

import { MarcasComponent } from './modules/vehiculos/controllers/marcas.component';
import { MarcasFormComponent } from './modules/vehiculos/controllers/marcas-form.component';

import { ModelosComponent } from './modules/vehiculos/controllers/modelos.component';
import { ModelosFormComponent } from './modules/vehiculos/controllers/modelos-form.component';

import { LoginComponent } from './modules/public/controllers/login.component';
/**Components imports**/

/**Services Imports **/
import { RentaService } from './modules/rentas/services/renta.service';
import { ClienteService } from './modules/clientes/services/cliente.service';
import { VehiculoService } from './modules/vehiculos/services/vehiculo.service';
import { UserService } from './modules/public/services/user.service';
import { MarcaService } from './modules/vehiculos/services/marca.service';
import { ModeloService } from './modules/vehiculos/services/modelo.service';
/**Services Imports **/

import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from 'angular-6-datatable';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '', component: AppComponent },
  /** Rutas de los distintos modulos **/
  { path: 'login', component: LoginComponent },
  /** Vehiculos */
  { path: 'vehiculos', component: VehiculosComponent },
  { path: 'vehiculos/create', component: VehiculosFormComponent },
  { path: 'vehiculos/update/:id', component: VehiculosFormComponent },

  /** Clientes */
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/create', component: ClientesFormComponent },
  { path: 'clientes/update/:id', component: ClientesFormComponent },

   /** Marcas */
   { path: 'marcas', component: MarcasComponent },
   { path: 'marcas/create', component: MarcasFormComponent },
   { path: 'marcas/update/:id', component: MarcasFormComponent },

    /** Modelos */
  { path: 'modelos', component: ModelosComponent },
  { path: 'modelos/create', component: ModelosFormComponent },
  { path: 'modelos/update/:id', component: ModelosFormComponent },

  /** Rentas **/
  { path: 'rentas', component: RentasComponent },
  { path: 'rentas/create', component: RentasFormComponent },
  { path: 'rentas/update/:id', component: RentasFormComponent }
];

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    FooterComponent,

    VehiculosComponent,
    VehiculosFormComponent,

    ClientesComponent,
    ClientesFormComponent,

    MarcasComponent,
    MarcasFormComponent,

    ModelosComponent,
    ModelosFormComponent,

    RentasComponent,
    RentasFormComponent,

    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularDateTimePickerModule,
    MatTableModule,
    MatCheckboxModule
  ],
  providers: [
    VehiculoService,
    ClienteService,
    RentaService,
    UserService,
    MarcaService,
    ModeloService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
