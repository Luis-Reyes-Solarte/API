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
  imports: [TableModule, ButtonModule, InputTextModule, HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './consulta.component.html',
  providers: [UserserviceService],
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {

  estudiante: any[] = []; // Almacena los usuarios
  codigo: string = ''; 
  errorMessage: string = '';
  isLoading: boolean = false; 
  selectedUser: any = null; // Estudiante seleccionado para editar.

  constructor(private UserserviceService: UserserviceService) {}

  // Método para buscar estudiantes por código
  searchUserById(): void {
    if (!this.codigo) {
      this.errorMessage = 'Por favor, ingresa un código válido.';
      return;
    }

    this.isLoading = true;
    this.UserserviceService.getUserById(this.codigo).subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.estudiante = response;
        } else if (response && typeof response === 'object') {
          this.estudiante = [response];
        } else {
          this.estudiante = [];
        }

        this.errorMessage = this.estudiante.length
          ? ''
          : 'No se encontró ningún estudiante con este código.';
      },
      error: (err) => {
        console.error('Error en la consulta', err);
        this.errorMessage = 'Error al buscar el estudiante.';
        this.estudiante = [];
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  // Método para eliminar un estudiante con confirmación
  deleteUserWithConfirmation(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este estudiante?')) {
      this.UserserviceService.deleteUser(id).subscribe({
        next: () => {
          // Filtrar el estudiante eliminado de la lista
          this.estudiante = this.estudiante.filter((user) => user.id !== id);
          alert('Estudiante eliminado exitosamente');
        },
        error: (err) => {
          console.error('Eliminado', err);
          alert('Eliminado. Recarga la página.');
        },
      });
    }
  }

  // Método para seleccionar un estudiante para editar
  editUser(user: any): void {
    this.selectedUser = { ...user }; // esto permite que se llenen los campos ya con los datos
  }

  // Método para guardar los cambios 
  saveUser(): void {
    if (this.selectedUser && this.selectedUser.id) {
      this.UserserviceService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
        next: (response) => {
          // se actualiza lista, recargar busquedad para observar
          const index = this.estudiante.findIndex(user => user.id === this.selectedUser.id);
          if (index !== -1) {
            this.estudiante[index] = { ...this.selectedUser }; // Actualiza el usuario en la lista
          }
          this.selectedUser = null; 
          alert('Estudiante actualizado exitosamente');
        },
        error: (err) => {
          console.error('Actualizado', err);
          alert('Actualizado,recargue pag');
        }
      });
    }
  }

  // Método para cancelar la edición
  cancelEdit(): void {
    this.selectedUser = null; // Limpiar el formulario
  }
}
