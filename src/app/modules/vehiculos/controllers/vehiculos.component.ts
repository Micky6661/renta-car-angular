import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../models/vehiculo';
import { VehiculoService } from '../services/vehiculo.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component ({
  selector: 'app-vehiculos',
  templateUrl: '../partials/vehiculos.component.html',
})
export class VehiculosComponent implements OnInit {

  public data: Vehiculo[];

  constructor(private vehiculoService: VehiculoService, private router: Router) {}

  ngOnInit() {
    this.vehiculoService.getVehiculos().subscribe(
      vehiculos => this.data = vehiculos
    );
  }

  public delete(carId: string): void {
    swal({
      title: 'Eliminar',
      text: '¿Deseas eliminar el registro seleccionado?',
      type: 'question',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      this.vehiculoService.deleteVehiculo(carId).subscribe(
        response => {
          if (response['status'] === 202 || response['status'] === 200) {
            swal('Eliminado', 'Registro eliminado exitosamente', 'success');
            this.vehiculoService.getVehiculos().subscribe(
              vehiculos => this.data = vehiculos
            );
          } else {
            swal('Error', 'No se ha podido eliminar registro', 'error');
          }
        }
      );
    });
  }
}
