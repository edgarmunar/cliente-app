import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Usuario";
  public errores: String[] = [];

  constructor(private clienteService: ClienteService,
    private router: Router, private activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.cargarCliente();
  }

  public cargarCliente(): void{
    this.activeRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })    
  }

  public create(): void {
    this.clienteService.create(this.cliente)
    .subscribe({
      next: (json) => {
        this.router.navigate(["/clientes"])
        swal.fire('Nuevo cliente',`${json.mensaje}: ${json.cliente.nombre}`,'success');
      },
      error : (err) => {
        this.errores = err.error.errors as String[];
        console.error('Mensaje de Error del Backend'+ err.status);
        console.error(err.error);
      }
    })
  }  

  public update():void {
    this.clienteService.update(this.cliente).subscribe({
      next: json => {
        this.router.navigate(["/clientes"])
        swal.fire('Actualización Cliente',`${json.mensaje}: ${json.cliente.nombre}`,'success');
      },
      error : err => {
        this.errores = err.error.errors as String[];
        console.error('Mensaje de Error del Backend'+ err.status);
        console.error(err.error);
      }
  })
  }
}