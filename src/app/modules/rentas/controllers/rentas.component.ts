import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Renta } from '../models/renta';
import { RentaService } from '../services/renta.service';

@Component ({
  selector: 'app-rentas',
  templateUrl: '../partials/rentas.component.html'
})
export class RentasComponent implements OnInit {

  public data: Renta[];

  constructor(private rentaService: RentaService) {}

  ngOnInit() {
    this.rentaService.getRentas().subscribe(
      rentas => this.data = rentas
    );
  }

  public delete(id: string): void {
    swal({
      title: 'Eliminar',
      text: '¿Deseas eliminar el registro seleccionado?',
      type: 'question',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      this.rentaService.delete(id).subscribe(
        response => {
          if (response['status'] === 202 || response['status'] === 200) {
            swal('Eliminado', 'Registro eliminado exitosamente', 'success');
            this.rentaService.getRentas().subscribe(
              rentas => this.data = rentas
            );
          } else {
            swal('Error', 'No se ha podido eliminar registro', 'error');
          }
        }
      );
    });
  }
}
