import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import swal from 'sweetalert2';

@Component ({
  selector: 'app-clientes-create',
  templateUrl: '../partials/clientes-form.component.html'
})
export class ClientesFormComponent implements OnInit {

  titulo: string;
  cliente: any;
  isEdit: boolean;

  constructor(private router: Router , private activatedRoute: ActivatedRoute, private clienteService: ClienteService) { }

  ngOnInit() {
    this.getCliente();
  }

  public getCliente() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Modificar Cliente';
        this.clienteService.getClienteById(id).subscribe(
          (cliente) => this.cliente = cliente
        );
        this.isEdit = true;
      } else {
        this.titulo = 'Crear Cliente';
        this.cliente = new Cliente;
      }
    });
  }

  public submitSave(): void {
    this.clienteService.insertCliente(this.cliente).subscribe(
      response => {
        if (response['status'] === 201 || response['status'] === 200) {
          this.router.navigate(['/clientes']);
          swal('Guardado', 'Registro guardado exitosamente', 'success');
        } else {
          swal('Error', 'No se ha podido guardar registro', 'error');
        }
      }
    );
  }

  public submitEdit(): void {
    this.clienteService.updateCliente(this.cliente).subscribe(
      response => {
        if (response['status'] === 202 || response['status'] === 200) {
          this.router.navigate(['/clientes']);
          swal('Modificado', 'Registro modificado exitosamente', 'success');
        } else {
          swal('Error', 'No se ha podido modificar registro', 'error');
        }
      }
    );
  }

}
