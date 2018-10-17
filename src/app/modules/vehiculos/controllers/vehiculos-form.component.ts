import { Component, OnInit} from '@angular/core';
import { Vehiculo } from '../models/vehiculo';
import { Marca } from '../models/marca';
import { Modelo } from '../models/modelo';
import { VehiculoService } from '../services/vehiculo.service';
import { Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos-create',
  templateUrl: '../partials/vehiculos-form.component.html',
  // styleUrls: [
  //   './vehiculos-create.component.css'
  // ]
})
export class VehiculosFormComponent implements OnInit {

  public titulo: string;
  public isEdit = false;

  constructor(private vehiculoService: VehiculoService, private router: Router , private activatedRoute: ActivatedRoute) { }

  public vehiculo: Vehiculo;
  public listaMarcas: Marca[];
  public listaModelos: Modelo[];

  ngOnInit() {
    this.getVehiculo();
    this.getMarcas();
    this.getModelos();
  }

  public getVehiculo() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Modificar Vehiculo';
        this.vehiculoService.getVehiculoById(id).subscribe(
          (vehiculo) => this.vehiculo = vehiculo
        );
        this.isEdit = true;
      } else {
        this.titulo = 'Crear Vehiculo';
        this.vehiculo = new Vehiculo;
      }
    });
  }

  public getMarcas() {
    return this.vehiculoService.getMarcas().subscribe(
      result => this.listaMarcas = result
    );
  }

  public getModelos() {
    return this.vehiculoService.getModelos().subscribe(
      result => this.listaModelos = result
    );
  }

  public submitSave(): void {
    this.vehiculoService.insertVehiculo(this.vehiculo).subscribe(
      response => {
        if (response['status'] === 201 || response['status'] === 200) {
          this.router.navigate(['/vehiculos']);
          swal('Guardado', 'Registro guardado exitosamente', 'success');
        } else {
          swal('Error', 'No se ha podido guardar registro', 'error');
        }
      }
    );
  }

  public submitEdit(): void {
    this.vehiculoService.updateVehiculo(this.vehiculo).subscribe(
      response => {
        if (response['status'] === 202 || response['status'] === 200) {
          this.router.navigate(['/vehiculos']);
          swal('Modificado', 'Registro modificado exitosamente', 'success');
        } else {
          swal('Error', 'No se ha podido modificar registro', 'error');
        }
      }
    );
  }
}
