import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { VehiculosComponent } from './modules/vehiculos/controllers/vehiculos.component';
import { VehiculosFormComponent } from './modules/vehiculos/controllers/vehiculos-form.component';

import { VehiculoService } from './modules/vehiculos/services/vehiculo.service';

import { ClientesComponent } from './modules/clientes/controllers/clientes.component';
import { ClientesFormComponent } from './modules/clientes/controllers/clientes-form.component';

import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from "angular-6-datatable";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'vehiculos', component: VehiculosComponent },
  { path: 'vehiculos/create', component: VehiculosFormComponent },
  { path: 'vehiculos/update/:id', component: VehiculosFormComponent },

  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/create', component: ClientesFormComponent },
  { path: 'clientes/update/:id', component: ClientesFormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

    VehiculosComponent,
    VehiculosFormComponent,

    ClientesComponent,
    ClientesFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DataTableModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    VehiculoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
