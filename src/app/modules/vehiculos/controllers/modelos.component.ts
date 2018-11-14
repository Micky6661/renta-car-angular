import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Modelo } from '../models/modelo';
import { ModeloService } from '../services/modelo.service';

@Component ({
  selector: 'app-modelos',
  templateUrl: '../partials/modelos.components.html',
})
export class ModelosComponent implements OnInit {

  public data: Modelo[];

  constructor(private modeloService: ModeloService, private router: Router) {}

  ngOnInit() {
    this.modeloService.getModelos().subscribe(
      modelos => this.data = modelos
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
      this.modeloService.deleteModelo(id).subscribe(
        response => {
          if (response['status'] === 202 || response['status'] === 200) {
            swal('Eliminado', 'Registro eliminado exitosamente', 'success');
            this.modeloService.getModelos().subscribe(
              marcas => this.data = marcas
            );
          } else {
            swal('Error', 'No se ha podido eliminar registro', 'error');
          }
        }
      );
    });
  }
}
