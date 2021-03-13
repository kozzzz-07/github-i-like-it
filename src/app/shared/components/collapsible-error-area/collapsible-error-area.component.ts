import { NestedTreeControl } from '@angular/cdk/tree';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'app-collapsible-error-area',
  templateUrl: './collapsible-error-area.component.html',
  styleUrls: ['./collapsible-error-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapsibleErrorAreaComponent implements OnInit, OnChanges {
  @Input() errorMessages: ErrorMessage[] | undefined;

  treeControl = new NestedTreeControl<ErrorNode>(
    (messages) => messages.children
  );
  dataSource = new MatTreeNestedDataSource<ErrorNode>();

  constructor() {}

  hasChild = (_: number, messages: ErrorNode) =>
    !!messages.children && messages.children.length > 0;

  ngOnInit(): void {
    this.setaDataSource(this.errorMessages);
  }

  ngOnChanges(): void {
    this.setaDataSource(this.errorMessages);
  }

  private setaDataSource(errorMessages: ErrorMessage[] = []): void {
    this.dataSource.data = errorMessages.length
      ? [
          {
            message:
              errorMessages.length === 1 ? 'Error Message' : 'Error Messages',
            children: errorMessages,
          },
        ]
      : errorMessages;
  }
}

interface ErrorNode {
  message: string;
  children?: ErrorNode[];
}

export type ErrorMessage = {
  message: string;
};
