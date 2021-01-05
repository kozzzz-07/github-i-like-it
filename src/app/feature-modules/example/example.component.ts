import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExampleService } from './example.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit, OnDestroy {
  user$ = this.exampleService.user$;
  me = '';
  private s$!: Subscription;

  constructor(private exampleService: ExampleService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.s$.unsubscribe();
  }

  login(): void {
    this.exampleService.login();
  }

  logout(): void {
    this.exampleService.logout();
  }

  getMe(): void {
    this.s$ = this.exampleService.query().subscribe(me => {
      this.me = me.data.viewer.login;
    });
  }
}


