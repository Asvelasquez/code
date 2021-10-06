import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {
  displayedColumns: string[] = ['placa', 'modelo','marca','tipoVehiuclo','capacidad'];
  dataSource = new MatTableDataSource<Vehiculo>();
  constructor(private vehiculoService: VehiculoService) { }

  ngOnInit(): void {
    /*
    let vehiculo: Vehiculo = new Vehiculo();
    vehiculo.placa = "abc-789";
    vehiculo.modelo = "2021";
    vehiculo.marca = "Renault";
    vehiculo.tipoVehiuclo = "Carga";
    vehiculo.capacidad = "120Kg"; 
    */
    this.vehiculoService.listar(0,3).subscribe(data =>{
     this.dataSource = new MatTableDataSource(data);
     console.log(data);
    //this.vehiculoService.guardar(vehiculo).subscribe(data =>{
       // console.log("Se registro vehiculo");
    });

  }

}
