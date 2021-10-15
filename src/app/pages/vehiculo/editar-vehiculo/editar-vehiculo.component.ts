import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { ErrorInterceptorService } from 'src/app/_share/error-interceptor.service';

@Component({
  selector: 'app-editar-vehiculo',
  templateUrl: './editar-vehiculo.component.html',
  styleUrls: ['./editar-vehiculo.component.css']
})
export class EditarVehiculoComponent implements OnInit {
  public selectedTipo: any;
  public selectedMarca!: string;

  form!: FormGroup;

  vehicle: Vehiculo = new Vehiculo();

  veh: any;
  constructor(private VehService: VehiculoService, private formBuilder: FormBuilder, 
    public errorInterceptor: ErrorInterceptorService, private router: Router, 
    private route: ActivatedRoute) {this.buildForm(); }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let idVehiculo = params.idCamion;
      this.cargarVehiculo(idVehiculo);
    
  });
}

cargarVehiculo(idVehiculo: number): void{
  this.VehService.listar(idVehiculo).subscribe(data => {
    this.veh = data;
    console.log(this.veh.placa);
  });
}

editarVehiculo(event: Event): void{
  event.preventDefault();

  const v: Vehiculo = new Vehiculo();

  v.idVehiculo = this.veh.idVehiculo;
  v.placa = this.form.value.placa;
  v.marca = this.form.value.marca;
  v.modelo = this.form.value.modelo;
  v.tipoVehiuclo = this.form.value.tipoVehiculo;
  v.capacidad = this.form.value.capacidad;

  if (this.form.valid)
  {
    this.VehService.editar(v).subscribe(success => {
      console.log(success);
      this.router.navigate(['/vehiculo']);
      this.form.reset();
    }, err => {
      console.log(err);
    });
  }else{
    this.form.markAllAsTouched();
  }
}

private buildForm(): void{
  this.form = this.formBuilder.group(
    {
      idVehiculo: ['', []],
      placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required, Validators.min(1980), Validators.max(2022)]],
      tipoVehiculo: ['', [Validators.required]],
      capacidad: ['', [Validators.required]],
    });

}
}