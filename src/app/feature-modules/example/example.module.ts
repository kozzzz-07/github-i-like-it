import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './example.component';
import { ExampleRoutingModule } from './example-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ExampleComponent],
  imports: [CommonModule, ExampleRoutingModule, HttpClientModule],
})
export class ExampleModule {}
