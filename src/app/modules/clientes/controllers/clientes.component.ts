import { Cliente } from './../models/cliente';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';

@Component ({
  selector: 'app-clientes',
  templateUrl: '../partials/clientes.component.html'
  // styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public data: Cliente[];

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      clientes => this.data = clientes
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
      this.clienteService.deleteCliente(id).subscribe(
        response => {
          if (response['status'] === 202 || response['status'] === 200) {
            swal('Eliminado', 'Registro eliminado exitosamente', 'success');
            this.clienteService.getClientes().subscribe(
              clientes => this.data = clientes
            );
          } else {
            swal('Error', 'No se ha podido eliminar registro', 'error');
          }
        }
      );
    });
  }
}
