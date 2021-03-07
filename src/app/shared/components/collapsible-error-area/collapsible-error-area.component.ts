import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'app-collapsible-error-area',
  templateUrl: './collapsible-error-area.component.html',
  styleUrls: ['./collapsible-error-area.component.scss'],
})
export class CollapsibleErrorAreaComponent implements OnInit, OnChanges {
  @Input() errorMessages: ErrorMessage[] = [];

  treeControl = new NestedTreeControl<ErrorNode>(
    (messages) => messages.children
  );
  dataSource = new MatTreeNestedDataSource<ErrorNode>();

  constructor() {}

  hasChild = (_: number, messages: ErrorNode) =>
    !!messages.children && messages.children.length > 0;

  ngOnInit(): void {
    console.log('ngOnInit', this.errorMessages);
    this.setaDataSource();
  }

  ngOnChanges(): void {
    console.log(this.errorMessages);
    this.setaDataSource();
  }

  private setaDataSource(): void {
    this.dataSource.data = this.errorMessages.length
      ? [
          {
            message:
              this.errorMessages.length === 1
                ? 'Error Message'
                : 'Error Messages',
            children: this.errorMessages,
          },
        ]
      : this.errorMessages;
  }
}

interface ErrorNode {
  message: string;
  children?: ErrorNode[];
}

export type ErrorMessage = {
  message: string;
};
