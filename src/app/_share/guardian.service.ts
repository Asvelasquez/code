import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../_service/login.service';
import { BnNgIdleService } from 'bn-ng-idle';
@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate {

  constructor(private loginService:LoginService,private router: Router,private bnIdle: BnNgIdleService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    if(this.loginService.estaLogueado() == true){
      const helper = new JwtHelperService();
      let token = sessionStorage.getItem(environment.TOKEN);

      if(!helper.isTokenExpired(token)){

        const decodedToken = helper.decodeToken(token);
        const rol: string = decodedToken.authorities[0];
        const url: string = state.url;
        
        if(url.includes('editar') && rol === 'Administrador')
          return true;
        else if(url.includes('departamento') && rol === 'Administrador')
          return true;
        else if(url.includes('vehiculo') && rol === 'Administrador')
          return true;   
        else if(url.includes('conductor') && rol === 'Administrador')
          return true;   
        else {
         // this.router.navigate(['/nopermiso']);
          //return false;
        }

      } else {
        this.loginService.cerrarSesion();
        return false;
      }

      return true;
    }else{
      this.router.navigate(['/nopermiso']);
      return false;
    }
   
      
    
   
  }



}
