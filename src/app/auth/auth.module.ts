import { CommonModule } from '@angular/common';
// Componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [ 
        CommonModule,
        FormsModule,
        AngularFireAuthModule,
        RouterModule
     ],
    exports: [],
    providers: [],
})
export class AuthModule {}

