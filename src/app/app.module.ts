import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { VehiculosComponent } from './modules/vehiculos/vehiculos.component';
import { VehiculoService } from './modules/vehiculos/vehiculo.service';
import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'/404',pathMatch:'full'},
  {path:'vehiculos',component:VehiculosComponent}
  // {path:'clientes',component:VehiculosComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    VehiculosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [VehiculoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
