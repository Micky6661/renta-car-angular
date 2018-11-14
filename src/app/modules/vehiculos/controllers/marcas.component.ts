import { Marca } from './../models/marca';
import { MarcaService } from './../services/marca.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component ({
  selector: 'app-marcas',
  templateUrl: '../partials/marcas.component.html',
})
export class MarcasComponent implements OnInit {

  public data: Marca[];

  constructor(private marcaService: MarcaService, private router: Router) {}

  ngOnInit() {
    this.marcaService.getMarcas().subscribe(
      marcas => this.data = marcas
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
      this.marcaService.deleteMarca(id).subscribe(
        response => {
          if (response['status'] === 202 || response['status'] === 200) {
            swal('Eliminado', 'Registro eliminado exitosamente', 'success');
            this.marcaService.getMarcas().subscribe(
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
