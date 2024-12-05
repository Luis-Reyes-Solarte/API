import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserserviceService } from '../../services/userservice.service';
@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [TableModule, ButtonModule, InputTextModule,HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent {

 estudiante: any[] = []; // Almacena los usuarios filtrados.
  codigo: string = ''; // ID ingresado por el usuario.
  errorMessage: string = '';
  isLoading: boolean = false; // Indica si la búsqueda está en progreso.

  constructor(private UserserviceService: UserserviceService) {}

  // Método para buscar usuarios por ID
  searchUserById(): void {
    if (!this.codigo) {
      this.errorMessage = 'Por favor, ingresa un codigo válido.';
      return;
    }
  
    this.isLoading = true;
    this.UserserviceService.getUserById(this.codigo).subscribe({
      next: (user) => {
        this.estudiante = user ? [user] : [];
        this.errorMessage = this.estudiante.length ? '' : 'No se encontró ningún estudiante con este codigo.';
      },
      error: () => {
        this.errorMessage = 'Error al buscar el estudiante.';
        this.estudiante = [];
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

}