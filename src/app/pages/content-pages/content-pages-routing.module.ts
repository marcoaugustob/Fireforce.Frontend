import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from "./error/error-page.component";
import { LoginPageComponent } from './login/login.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

const routes: Routes = [
    {
        path: '', children: [
            { path: 'erro', component: ErrorPageComponent, data: { title: 'Erro', } },
            { path: 'access-denied', component: AccessDeniedComponent, data: { title: 'Acesso Negado', } },
            {
                path: 'login', component: LoginPageComponent, data: { title: 'Login', }, children: []
            }
        ]
    }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule], })
export class ContentPagesRoutingModule { }

