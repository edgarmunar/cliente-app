import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {

  }

  ngOnInit(): void {

    //this.clientes = CLIENTES;   
    //this.clientes = this.clienteService.getClienteS();    
    this.clienteService.getClientes().subscribe(
      /*function(clientes){
        clientes = clientes;
      } Esto es mas simplificado de la siguiente forma: */
      clientes => this.clientes = clientes
    );
  }

  public delete(cliente: Cliente): void {

    //mensaje de SweetAlert con boostrap
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({//texto con pregunta
      title: "Esta Seguro?",
      text: `Seguro va a eliminar al cliente ${cliente.nombre}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {//si eliminado haga

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)//si es igual a cliente eliminado filtrelo
            swalWithBootstrapButtons.fire({
              title: "Eliminado!!",
              text: `El cliente ${cliente.nombre} ha sido eliminado con exito!`,
              icon: "success"
            });
          }
        )        
      } 
      }
    );
  }
}