import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { UserserviceService } from '../../services/userservice.service';  // Asegúrate de que este sea el servicio correcto

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [ButtonModule, HttpClientModule, CommonModule, TableModule],
  templateUrl: './listado.component.html',
  providers: [ UserserviceService ],
  styleUrl: './listado.component.css'
})
export class ListadoComponent {
  users: any[] = []; 
  errorMessage: string = ''; 

  constructor(private userservice: UserserviceService) {
    this.loadUsers();  // Cargar usuarios al iniciar el componente
  }

  loadUsers(): void {
    this.userservice.getUsers().subscribe({
      next: (users) => {
        this.users = users;  // Asignar los usuarios a la variable
      },
      error: () => {
        this.errorMessage = 'Error al cargar los usuarios';  // Mostrar un mensaje de error
      }
    });
  }
}
