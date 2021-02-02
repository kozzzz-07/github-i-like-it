import { StarsState, StarsStore } from '../../../component-store/stars.store';
import {
  NextPage,
  PreviousPage,
} from './../../../../../models/pagination.model';
import { StarsService } from './../../../services/stars.service';
import { Component, OnInit } from '@angular/core';
import { FirstPage, PageChangeEvent } from 'src/app/models/pagination.model';
import { DEFAULT_PAGE_SIZE } from 'src/app/shared/components/pagination/consts/pagination';

@Component({
  selector: 'app-container-list',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss'],
  providers: [StarsStore],
})
export class ListContainerComponent implements OnInit {
  starredRepositories: any = [];

  startCursor: StarsState['startCursor'] = '';
  endCursor: StarsState['endCursor'] = '';

  constructor(
    private readonly starsService: StarsService,
    private readonly starsStore: StarsStore
  ) {}

  ngOnInit(): void {
    const page: FirstPage = {
      first: DEFAULT_PAGE_SIZE,
    };

    // serviceでsubjectを返すようにする
    this.starsService
      .getMyStarredRepositories(page)
      .subscribe((repositories) => {
        console.log(repositories);
        this.starredRepositories = (repositories as any).data.viewer.starredRepositories;

        this.updateEndCursor(this.starredRepositories.pageInfo.endCursor);
      });

    // TODO: unsubscribe
    this.starsStore.startCursor$.subscribe((startCursor) => {
      console.log({ startCursor });

      this.startCursor = startCursor;
    });

    // TODO: unsubscribe
    this.starsStore.endCursor$.subscribe((endCursor) => {
      console.log({ endCursor });
      this.endCursor = endCursor;
    });
  }

  onPagenate(event: Readonly<PageChangeEvent>): void {
    console.log(event);
    // FirstPage / lastpage
    if (event.isFirstPage) {
      this.goFirst(event);
    } else if (event.isNext) {
      this.goNext(event);
    } else {
      this.goPrevious(event);
    }
  }

  private goFirst(event: PageChangeEvent): void {
    const page: FirstPage = {
      first: event.pageSize,
    };

    console.log('FirstPage', page);
    this.starsService
      .getMyStarredRepositories(page)
      .subscribe((repositories) => {
        console.log(repositories);
        this.starredRepositories = (repositories as any).data.viewer.starredRepositories;

        this.updateStartCursor(this.starredRepositories.pageInfo.startCursor);
        this.updateEndCursor(this.starredRepositories.pageInfo.endCursor);
      });
  }

  private goNext(event: PageChangeEvent): void {
    const page: NextPage = {
      first: event.pageSize,
      after: this.endCursor,
    };

    console.log('NextPage', page);
    this.starsService
      .getMyStarredRepositories(page)
      .subscribe((repositories) => {
        console.log(repositories);
        this.starredRepositories = (repositories as any).data.viewer.starredRepositories;

        this.updateStartCursor(this.starredRepositories.pageInfo.startCursor);
        this.updateEndCursor(this.starredRepositories.pageInfo.endCursor);
      });
  }

  private goPrevious(event: PageChangeEvent): void {
    const page: PreviousPage = {
      last: event.pageSize,
      before: this.startCursor,
    };

    console.log('PreviousPage', page);

    this.starsService
      .getMyStarredRepositories(page)
      .subscribe((repositories) => {
        console.log(repositories);
        this.starredRepositories = (repositories as any).data.viewer.starredRepositories;

        this.updateStartCursor(this.starredRepositories.pageInfo.startCursor);
        this.updateEndCursor(this.starredRepositories.pageInfo.endCursor);
      });
  }

  private updateStartCursor(startCursor: string): void {
    this.starsStore.updateStartCursor(startCursor);
  }

  private updateEndCursor(endCursor: string): void {
    this.starsStore.updateEndCursor(endCursor);
  }
}
