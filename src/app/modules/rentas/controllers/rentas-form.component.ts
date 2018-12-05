import { EstadoRenta } from './../models/estado-renta';
import { VehiculoService } from './../../vehiculos/services/vehiculo.service';
import { ClienteService } from './../../clientes/services/cliente.service';
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
  listaEstados: EstadoRenta[];

  /* Variables modelos para Submit */
  // saveRenta: RentaDTO;
  savedetalleRenta = {
    inserted : [],
    edited : [],
    deleted : []
  };
  /* Variables modelos para Submit */

  detalleModel = new DetalleRenta;
  renta: Renta;
  listaDetalleRenta;
  fechaInicioDetalle = new Date();
  fechaFinDetalle = new Date();
  vehiculoDetalle = new Vehiculo;

  /* Visual Settings Init*/
  isEdit: boolean;

  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MMM-yyyy hh:mm a',
    defaultOpen: false,
    closeOnSelect: false
  };

  /* Visual Settings End*/

  constructor(
    private router: Router ,
    private activatedRoute: ActivatedRoute,
    private rentaService: RentaService,
    private clienteService: ClienteService,
    private vehiculoService: VehiculoService) { }

  ngOnInit() {
    this.getRenta();
    this.getClientes();
    this.getVehiculos();
    this.getListaEstadosRenta();
  }

  public async getRenta() {
    await this.activatedRoute.params.subscribe(async params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Modificar Renta';
        this.renta =  await this.rentaService.getById(id);
        this.listaDetalleRenta = this.renta.detalleRentaList;
        this.isEdit = true;
      } else {
        this.titulo = 'Crear Renta';
        this.renta = new Renta;
        this.listaDetalleRenta = [];
      }
    });
  }

  public getClientes() {
    this.clienteService.getClientes().subscribe(
      clientes => this.listaClientes = clientes
    );
  }

  public getVehiculos() {
    this.vehiculoService.getVehiculos().subscribe(
      vehiculos => this.listaVehiculos = vehiculos
    );
  }

  public getListaEstadosRenta() {
    this.rentaService.getEstadosRentas().subscribe(
      estadosRentas => this.listaEstados = estadosRentas
    );
  }

  public putSelectedValue(row) {
    console.log(row);
  }

  public addItem(vehiculoDetalle, fechaInicioDetalle, fechaFinDetalle) {
    const obj = new DetalleRenta;
    obj.vehiculo = vehiculoDetalle;
    obj.fechaInicioRenta = fechaInicioDetalle;
    obj.fechaFinRenta = fechaFinDetalle;
    this.savedetalleRenta.inserted.push(obj);
    // if (detalleRenta != null) {
    //   if (detalleRenta.vehiculo != null && detalleRenta.fechaInicioRenta != null && detalleRenta.fechaFinRenta != null) {
    //     // this.listaGuardar.push(detalleModel);
    //     console.log(detalleRenta);

    //   } else {
    //     swal('Aviso', 'Complete los campos obligatorios', 'warning');
    //   }
    // } else {
    //   swal('Aviso', 'Complete los campos obligatorios', 'warning');
    // }
  }

  public editItem() {

  }

  public saveEditItem(vehiculoDetalle, fechaInicioDetalle, fechaFinDetalle) {
    const obj = new DetalleRenta;
    obj.vehiculo = vehiculoDetalle;
    obj.fechaInicioRenta = fechaInicioDetalle;
    obj.fechaFinRenta = fechaFinDetalle;
    this.savedetalleRenta.edited.push(obj);
    // this.savedetalleRenta.edited.push(obj);
  }

  public removeItem(detalleRenta: DetalleRenta) {
    // this.savedetalleRenta.deleted.push(detalleRenta);
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
