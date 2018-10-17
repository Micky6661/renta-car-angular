import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { RentaService } from '../services/renta.service';
import { Renta } from '../models/renta';
import { Cliente } from '../../clientes/models/cliente';
import { Vehiculo } from '../../vehiculos/models/vehiculo';
import { DetalleRenta } from '../models/detalle-renta';

@Component ({
  selector: 'app-rentas-form',
  templateUrl: '../partials/rentas-form.component.html'
})
export class RentasFormComponent implements OnInit {

  titulo: string;
  listaClientes: Cliente[];
  listaVehiculos: Vehiculo[];
  renta: Renta;
  listaDetalles: DetalleRenta[];

  detalleModel = new DetalleRenta;
  isEdit: boolean;

  /** Variables Logicas*/
  listaEliminar: DetalleRenta[];
  listaModificar: DetalleRenta[];
  listaGuardar: DetalleRenta[];

  constructor(private router: Router , private activatedRoute: ActivatedRoute, private rentaService: RentaService) { }

  ngOnInit() {
    this.getRenta();
  }

  public getRenta() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Modificar Renta';
        this.rentaService.getById(id).subscribe(
          (renta) => this.renta = renta
        );
        this.isEdit = true;
      } else {
        this.titulo = 'Crear Renta';
        this.renta = new Renta;
      }
    });
  }

  public addItem(detalleModel: DetalleRenta) {
    if (detalleModel != null) {
      if (detalleModel.vehiculo != null && detalleModel.fechaInicioRenta != null && detalleModel.fechaFinRenta != null) {
        this.listaGuardar.push(detalleModel);
      } else {
        swal('Aviso', 'Complete los campos obligatorios', 'warning');
      }
    } else {
      swal('Aviso', 'Complete los campos obligatorios', 'warning');
    }
  }

  public submitSave(): void {
    this.rentaService.insert(this.renta).subscribe(
      response => {
        if (response['status'] === 201 || response['status'] === 200) {
          this.router.navigate(['/rentas']);
          swal('Guardado', 'Registro guardado exitosamente', 'success');
        } else {
          swal('Error', 'No se ha podido guardar registro', 'error');
        }
      }
    );
  }

  public submitEdit(): void {
    this.rentaService.update(this.renta).subscribe(
      response => {
        if (response['status'] === 202 || response['status'] === 200) {
          this.router.navigate(['/rentas']);
          swal('Modificado', 'Registro modificado exitosamente', 'success');
        } else {
          swal('Error', 'No se ha podido modificar registro', 'error');
        }
      }
    );
  }

}
