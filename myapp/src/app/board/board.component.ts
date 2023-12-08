import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, SquareComponent],
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {
  squares!: any[][];
  redIsNext!: boolean;
  winner!: string;

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void {
    const rows = 6;
    const columns = 7;
    this.squares = Array.from(Array(rows), () => new Array(columns).fill(null));
    this.redIsNext = true;
    this.winner = '';
  }

  get player() {
    return this.redIsNext === true ? 'R' : 'Y';
  }

  makeMove(col: number): void {
    if (this.winner) return;

    let empty = true;
    let row = 0;
    for (let i = this.squares.length - 1; i >= 0 && empty; --i) {
      if (!this.squares[i][col]) {
        this.squares[i][col] = this.player;
        row = i;
        empty = false;
      }
    }
    if (empty) return;

    this.redIsNext = !this.redIsNext;
    this.winner = this.checkWinner(row, col);
  }

  checkWinner(row: number, col: number): string {
    // this.squares[5][0] = 'R';
    // this.squares[4][1] = 'R';
    // this.squares[3][2] = 'R';
    // this.squares[2][3] = 'R';
    // row = 2;
    // col = 3;

    const lines = [
      [1, 0, 2, 0, 3, 0], // checks connect 4 down
      [0, 1, 0, 2, 0, 3], // checks 4 right
      [0, -1, 0, -2, 0, -3], // checks 4 left
      [-1, -1, -2, -2, -3, -3], // check diagonal left up
      [-1, 1, -2, 2, -3, 3], // check diagonal left down
      [1, -1, 2, -2, 3, -3], // check diagonal right up
      [1, 1, 2, 2, 3, 3], // check diagonal right down
    ];

    const player = this.squares[row][col];
    for (let i = 0; i < lines.length; ++i) {
      const [x1, y1, x2, y2, x3, y3] = lines[i];

      // continues to the next line if current check is out of bounds
      if (x3 == 3) {
        if (row + 3 >= 6) continue;
      } else if (x3 == -3) {
        if (row - 3 < 0) continue;
      } else if (y3 == 3) {
        if (col + 3 >= 7) continue;
      } else if (y3 == -3) {
        if (col - 3 < 0) continue;
      }
      if (
        player === this.squares[row + x1][col + y1] &&
        player === this.squares[row + x2][col + y2] &&
        player === this.squares[row + x3][col + y3]
      ) {
        return player;
      }
    }
    return '';
  }
}
