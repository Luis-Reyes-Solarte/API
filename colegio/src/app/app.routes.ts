import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { ListadoComponent } from './components/listado/listado.component';
import { RegistroComponent } from './components/registro/registro.component';

export const routes: Routes = [

    {

        path: 'consulta',
        component: ConsultaComponent
    
    },

    {

        path: 'listado',
        component: ListadoComponent
    
    },
    {

        path: 'registro',
        component: RegistroComponent
    
    },
];
