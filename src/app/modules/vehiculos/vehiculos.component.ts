import { Component, OnInit } from '@angular/core';
import {Vehiculo} from './vehiculo';
import {VehiculoService} from './vehiculo.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {
  public data : Vehiculo[];
  // vehiculos: Vehiculo[];

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit() {
    this.vehiculoService.getVehiculos().subscribe(
      vehiculos => this.data = vehiculos
    );
  }


}
