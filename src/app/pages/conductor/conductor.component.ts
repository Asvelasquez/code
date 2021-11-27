import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { Conductor } from 'src/app/_model/conductor';
import { ConductorService } from 'src/app/_service/conductor.service';
import {FormControl, Validators} from '@angular/forms';
import { ProgressBarService } from 'src/app/_service/progress-bar.service';
@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit {
  //displayedColumns: string[] = ['placa', 'modelo','marca','tipoVehiuclo','capacidad','direccion','celular','celularAux','correo','ciudad','editar'];
//  dataSource = new MatTableDataSource<Vehiculo>();
  displayedColumns: string[] = ['documento','nombre','apellido','nick','direccion','celular','celularAux','correo','ciudad','editar'];
  dataSource = new MatTableDataSource<Conductor>();
  @ViewChild(MatSort) sort: MatSort;
  constructor(private ConductorService: ConductorService ,
              private vehiculoService: VehiculoService ,
              public route: ActivatedRoute,
              private progressBarService: ProgressBarService) { }
  //paginador
  cantidad : number;
  pageIndex : number = 0;
  pageSize: number = 5;

  
   ngOnInit() {  
    this.progressBarService.progressBarReactiva.next(false);   
    this.listarPaginado();
    this.applyFilter;
    this.progressBarService.progressBarReactiva.next(true);
  }  
  listarPaginado(){
    this.ConductorService.listarconductor(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSource.data=data.content ;
      this.cantidad = data.totalElements;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator;
      this.applyFilter;
    });
  }
  cambioPagina(e: any){
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.listarPaginado();
    this.applyFilter(e);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
 //vehiculo
 /*
  ngOnInit() {  
    this.progressBarService.progressBarReactiva.next(false);   
    this.listarPaginado();
    this.applyFilter;
    this.progressBarService.progressBarReactiva.next(true);
  }  
  listarPaginado(){
    this.vehiculoService.listarVehiculo(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.cantidad = data.totalElements;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator;
      this.applyFilter;
    });
  }
  cambioPagina(e: any){
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.listarPaginado();
    this.applyFilter(e);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
*/
 
}
