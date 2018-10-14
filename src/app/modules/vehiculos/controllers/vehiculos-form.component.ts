import { Component, OnInit} from '@angular/core';
import { Vehiculo } from '../models/vehiculo';
import { Marca } from '../models/marca';
import { Modelo } from '../models/modelo';
import { VehiculoService } from '../services/vehiculo.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vehiculos-create',
  templateUrl: '../partials/vehiculos-form.component.html',
  // styleUrls: [
  //   './vehiculos-create.component.css'
  // ]
})
export class VehiculosFormComponent implements OnInit {

  public titulo: string;

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
}
