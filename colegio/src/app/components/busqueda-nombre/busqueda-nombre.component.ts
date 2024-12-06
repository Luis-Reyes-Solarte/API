import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { UserserviceService } from '../../services/userservice.service';  // Asegúrate de que este sea el servicio correcto

@Component({
  selector: 'app-busqueda-nombre',
  standalone: true,
  imports: [ButtonModule,CommonModule,TableModule,InputTextModule],
  templateUrl: './busqueda-nombre.component.html',
  providers: [ UserserviceService ],
  styleUrl: './busqueda-nombre.component.css'
})
export class BusquedaNombreComponent {
  users: any[] = []; 
  errorMessage: string = ''; 
  username: string = '';

  constructor(private userservice: UserserviceService) {
  }

  loadUsersbyName(): void {
    this.userservice.GetUsersbyName(this.username).subscribe({
      next: (users) => {
        this.users = users;  // Asignar los usuarios a la variable
      },
      error: () => {
        this.errorMessage = 'Error al cargar los usuarios';  // Mostrar un mensaje de error
      }
    });
  }
}
