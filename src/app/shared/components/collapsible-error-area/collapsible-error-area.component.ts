import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'app-collapsible-error-area',
  templateUrl: './collapsible-error-area.component.html',
  styleUrls: ['./collapsible-error-area.component.scss'],
})
export class CollapsibleErrorAreaComponent implements OnInit {
  treeControl = new NestedTreeControl<FoodNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;
  ngOnInit(): void {}
}

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {
        name:
          'Appaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaale',
      },
      {
        name:
          'Appaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaale',
      },
    ],
  },
];
