import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
})
export class LoginModule {}
