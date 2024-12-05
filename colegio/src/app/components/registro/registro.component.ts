import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(6)]]
    })
  };
}
