import { Component, EventEmitter, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() filterChanged = new EventEmitter<any>();

  status: string = '';
  priority: string = '';
  deadline: Date ;

  constructor( private datePipe: DatePipe) {
}


  onSubmit() {
    const filter = {
      status: this.status,
      priority: this.priority,
      deadline: this.deadline
    }
    this.filterChanged.emit(filter);
  }

  onDateChange(date: string) {
    this.deadline = new Date(date);
  }
}
