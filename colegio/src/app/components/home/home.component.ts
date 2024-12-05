import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule,MenubarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Consulta',
                icon: 'pi pi-search',
                
            },  
            {
                label: 'Listado',
                icon: 'pi pi-star'
            },
            {
                label: 'Registro',
                icon: 'pi pi-book',
                routerLink: '/registro'
            },
            {
                label: 'Contact',
                icon: 'pi pi-envelope'
            }
        ]
    }
}
