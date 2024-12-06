import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { UserserviceService } from '../../services/userservice.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ButtonModule,
  InputTextModule,CardModule],
  templateUrl: './registro.component.html',
  providers: [ UserserviceService ],
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private UserserviceService: UserserviceService){
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      cedula: ['',[Validators.required]],
      codigo: ['',[Validators.required]],
    })
  };

  realizar_registro(): void {
    const {username, cedula, codigo} = this.registroForm.value;
    this.UserserviceService.register(username, cedula, codigo);
  }

}
