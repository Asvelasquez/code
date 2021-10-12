import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
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
  
  constructor(private vehiculoService: VehiculoService ,public route: ActivatedRoute) { }
  cantidad : number;
  pageIndex : number = 0;
  pageSize: number = 5;
  
  ngOnInit(): void {
    /*
    let vehiculo: Vehiculo = new Vehiculo();
    vehiculo.placa = "abc-789";
    vehiculo.modelo = "2021";
    vehiculo.marca = "Renault";
    vehiculo.tipoVehiuclo = "Carga";
    vehiculo.capacidad = "120Kg"; 
    */
  /*
    this.vehiculoService.listarVehiculo(this.pageIndex,this.pageSize).subscribe(data =>{
     this.dataSource = new MatTableDataSource(data);
     console.log(data);
     
    //this.vehiculoService.guardar(vehiculo).subscribe(data =>{
       // console.log("Se registro vehiculo");
    });
    */
      
    this.listarPaginado();
  
  }
  listarPaginado(){
    this.vehiculoService.listarVehiculo(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.cantidad = data.totalElements;
      
    });
  }
  cambioPagina(e: any){
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.listarPaginado();
  }

}
