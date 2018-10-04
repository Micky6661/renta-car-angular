import { Component, OnInit } from '@angular/core';
import {Vehiculo} from '../models/vehiculo';
import {VehiculoService} from '../services/vehiculo.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: '../partials/vehiculos.component.html',
  // styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  public data : Vehiculo[];

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit() {
    this.vehiculoService.getVehiculos().subscribe(
      vehiculos => this.data = vehiculos
    );
  }

}
