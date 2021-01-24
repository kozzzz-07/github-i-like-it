import { StarsService } from './../../../services/stars.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-container-list',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss'],
})
export class ListContainerComponent implements OnInit {
  starredRepositories: any = [];

  constructor(private starsService: StarsService) {}

  ngOnInit(): void {
    this.starsService.getMyStarredRepositories().subscribe((repositories) => {
      console.log(repositories);
      this.starredRepositories = (repositories as any).data.viewer.starredRepositories;
    });
  }

  pageEvent(event: PageEvent): void {
    console.log(event);
  }
}
