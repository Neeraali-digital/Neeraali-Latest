import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  @Input() loading: boolean = false;
  @Output() loadingFinished = new EventEmitter<void>();

  ngOnInit() {
    setTimeout(() => {
      this.loadingFinished.emit();
    }, 2000);
  }
}
