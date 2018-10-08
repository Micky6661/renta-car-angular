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

import { LoginComponent } from './modules/public/controllers/login.component';
/**Components imports**/

/**Services Imports **/
import { VehiculoService } from './modules/vehiculos/services/vehiculo.service';
import { UserService } from './modules/public/services/user.service';
/**Services Imports **/

import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from "angular-6-datatable";

import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: AppComponent },
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
  /** Rentas **/
  // { path: 'rentas', component: RentasComponent },
  // { path: 'rentas/create', component: RentasFormComponent },
  // { path: 'rentas/update/:id', component: RentasFormComponent }
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

    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    VehiculoService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
