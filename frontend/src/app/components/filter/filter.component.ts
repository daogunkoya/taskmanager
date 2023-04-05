import { Component, EventEmitter, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() filterChanged = new EventEmitter<any>();

  taskStatuses: string[] = ['todo', 'in_progress', 'completed'];
  taskPriorities: string[] = ['low', 'medium', 'high'];

  selectedStatus: string = '';
  selectedPriority: string = '';
  selectedDeadline: Date ;

  constructor( private datePipe: DatePipe) {
}


  onSubmit() {


    const filter = {
      status: this.selectedStatus,
      priority: this.selectedPriority,
      deadline: this.selectedDeadline
    }
    //console.log('filters=', filter)
    this.filterChanged.emit(filter);
  }

  onDateChange(date: string) {
    const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    this.selectedDeadline = new Date(formattedDate);
  }
  
  
}
