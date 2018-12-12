import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import { ModeloService } from '../services/modelo.service';
import { Modelo } from '../models/modelo';

@Component ({
  selector: 'app-modelos-create',
  templateUrl: '../partials/modelos-form.component.html',
})
export class ModelosFormComponent implements OnInit {

  public titulo: string;
  public isEdit = false;

  constructor(private modeloService: ModeloService, private router: Router , private activatedRoute: ActivatedRoute) { }

  public modelo: Modelo;

  ngOnInit() {
    this.getModelos();
  }

  public getModelos() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Modificar Modelo';
        this.modeloService.getModeloById(id).subscribe(
          (modelo) => this.modelo = modelo
        );
        this.isEdit = true;
      } else {
        this.titulo = 'Crear Modelo';
        this.modelo = new Modelo;
      }
    });
  }

  async submitSave() {
    // const insertable = await this.validarMatricula(this.vehiculo.matricula, this.vehiculo.chasis);
    // if (insertable) {
      this.modeloService.insertModelo(this.modelo).subscribe(
        response => {
          if (response['status'] === 201 || response['status'] === 202 || response['status'] === 200) {
            this.router.navigate(['/modelos']);
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
      this.modeloService.updateModelo(this.modelo).subscribe(
        response => {
          if (response['status'] === 201 || response['status'] === 202 || response['status'] === 200) {
            this.router.navigate(['/modelos']);
            swal('Guardado', 'Registro modificado exitosamente', 'success');
          } else {
            swal('Error', 'No se ha podido modificado registro', 'error');
          }
        }
      );
    // }
  }

}
