import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../models/vehiculo';
import { Marca } from '../models/marca';
import { Modelo } from '../models/modelo';
import { VehiculoService } from '../services/vehiculo.service';

@Component({
  selector: 'app-vehiculos-create',
  templateUrl: '../partials/vehiculos-form.component.html',
  // styleUrls: [
  //   './vehiculos-create.component.css'
  // ]
})
export class VehiculosFormComponent implements OnInit {

  // public data: Vehiculo[];
  // public marcas: Marca[];
  // public modelos: Modelo[];

  constructor(private vehiculoService: VehiculoService) { }

  ngOnInit() {
    // this.marcaService.getMarcas().subscribe(
    //   marcas => this.marcas = marcas
    // );
    // this.modeloService.getModelos().subscribe(
    //   modelos => this.modelos = modelos
    // );
  }



}
