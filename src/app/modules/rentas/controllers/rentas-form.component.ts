import { RentaDTO } from './../models/rentaDTO';
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

@Component({
  selector: 'app-rentas-form',
  templateUrl: '../partials/rentas-form.component.html',
  // styleUrls: ['../styles/datetime.css']
})
export class RentasFormComponent implements OnInit {

  titulo: string;

  listaClientes: Cliente[];
  listaVehiculos: Vehiculo[];
  listaEstados: EstadoRenta[];
  selected = null;
  /* Variables modelos para Submit */
  // saveRenta: RentaDTO;
  savedetalleRenta = {
    inserted: [],
    edited: [],
    deleted: []
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
    private router: Router,
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
        this.renta = await this.rentaService.getById(id);
        if (this.renta) {
          this.listaDetalleRenta = this.renta.detalleRentaList;
        }
        this.isEdit = true;
      } else {
        this.titulo = 'Crear Renta';
        this.renta = new Renta;
        this.listaDetalleRenta = [];
      }
    });
  }

  public refreshTotal() {
    this.renta.montoTotal = 0;
    this.listaDetalleRenta.forEach(element => {
      this.renta.montoTotal += this.calculatePrice(element.fechaInicioRenta, element.fechaFinRenta, element.vehiculo.precio) * -1;
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
    this.selected = row;
  }

  public addItem(vehiculoDetalle, fechaInicioDetalle, fechaFinDetalle) {
    let obj = {
      vehiculo : vehiculoDetalle,
      fechaInicioRenta : new Date(fechaInicioDetalle).getTime(),
      fechaFinRenta : new Date(fechaFinDetalle).getTime()
    };

    if (obj != null) {
      if (obj.vehiculo != null && obj.fechaInicioRenta != null && obj.fechaFinRenta != null) {
        this.listaDetalleRenta.push(obj);
        this.savedetalleRenta.inserted.push(obj);
        obj = null;
      } else {
        swal('Aviso', 'Complete los campos obligatorios', 'warning');
      }
    } else {
      swal('Aviso', 'Complete los campos obligatorios', 'warning');
    }
    this.refreshTotal();
  }

  public removeItem() {
    swal({
      title: 'Eliminar',
      text: '¿Deseas eliminar el registro seleccionado?',
      type: 'question',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        for (let index = 0; index < this.listaDetalleRenta.length; index++) {
          if (this.selected.id == this.listaDetalleRenta[index].id) {
            this.listaDetalleRenta.splice(index, 1);
            this.savedetalleRenta.deleted.push(this.selected);
            swal('Eliminado', 'Registro eliminado', 'success');
            this.refreshTotal();
          }
        }
      }
    });
  }

  public calculatePrice(date1, date2, precioDia) {
    // Get 1 day in milliseconds
    const one_day = 1000 * 60 * 60 * 24;
    // Calculate the difference in milliseconds
    const difference_ms = date1 - date2;
    const totalDate =  difference_ms / one_day;
    // Convert back to days and return
    return totalDate * precioDia;
  }

  public submitSave(): void {
    const rentaDTO = new RentaDTO;
    rentaDTO.renta = this.renta;
    rentaDTO.inserted = this.savedetalleRenta.inserted;
    rentaDTO.deleted = this.savedetalleRenta.deleted;
    this.rentaService.insert(rentaDTO).subscribe(
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
    const rentaDTO = new RentaDTO;
    rentaDTO.renta = this.renta;
    rentaDTO.inserted = this.savedetalleRenta.inserted;
    rentaDTO.deleted = this.savedetalleRenta.deleted;
    this.rentaService.update(rentaDTO).subscribe(
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
