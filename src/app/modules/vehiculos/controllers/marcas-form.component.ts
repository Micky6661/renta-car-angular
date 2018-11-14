import { MarcaService } from './../services/marca.service';
import { Component, OnInit} from '@angular/core';
import { Marca } from '../models/marca';
import { Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-marcas-create',
  templateUrl: '../partials/marcas-form.component.html',
})
export class MarcasFormComponent implements OnInit {

  public titulo: string;
  public isEdit = false;

  constructor(private marcaService: MarcaService, private router: Router , private activatedRoute: ActivatedRoute) { }

  public marca: Marca;

  ngOnInit() {
    this.getMarcas();
  }

  public getMarcas() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Modificar Marca';
        this.marcaService.getMarcaById(id).subscribe(
          (marcas) => this.marca = marcas
        );
        this.isEdit = true;
      } else {
        this.titulo = 'Crear Marca';
        this.marca = new Marca;
      }
    });
  }

  async submitSave() {
    // const insertable = await this.validarMatricula(this.vehiculo.matricula, this.vehiculo.chasis);
    // if (insertable) {
      this.marcaService.insertMarca(this.marca).subscribe(
        response => {
          if (response['status'] === 201 || response['status'] === 202 || response['status'] === 200) {
            this.router.navigate(['/marcas']);
            swal('Guardado', 'Registro guardado exitosamente', 'success');
          } else {
            swal('Error', 'No se ha podido guardar registro', 'error');
          }
        }
      );
    // }
  }

  async submitEdit() {
    // const insertable = await this.validarMatricula(this.vehiculo.matricula, this.vehiculo.chasis);
    // if (insertable) {
      this.marcaService.updateMarca(this.marca).subscribe(
        response => {
          if (response['status'] === 201 || response['status'] === 202 || response['status'] === 200) {
            this.router.navigate(['/marcas']);
            swal('Guardado', 'Registro modificado exitosamente', 'success');
          } else {
            swal('Error', 'No se ha podido modificado registro', 'error');
          }
        }
      );
    // }
  }

}
