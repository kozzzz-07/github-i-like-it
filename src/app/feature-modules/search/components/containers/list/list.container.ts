import { Component, OnInit } from '@angular/core';
import { SearchStore } from '../../../component-store/search.store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-container-list',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss'],
  providers: [SearchStore],
})
export class ListContainerComponent implements OnInit {
  edges$ = this.searchStore.selectEdges().pipe(
    tap((ret) => {
      console.log('++search edges++');
      console.log(ret);
    })
  );

  constructor(private readonly searchStore: SearchStore) {}

  ngOnInit(): void {
    this.searchStore.getSearchRepositories({ first: 5, query: 'jQuery' });
  }
}
