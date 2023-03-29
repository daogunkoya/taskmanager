import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../../models/Task.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  title: string;
  description: string;
  dueDate: Date;
  reminder: boolean = false;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService, private datePipe: DatePipe) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  onDateChange(date: string) {
    this.dueDate = new Date(date);
  }

  onSubmit() {
    if (!this.title) {
      alert('Please add a task!');
      return;
    }

    const newTask: Task = {
      title: this.title,
      description: this.description,
      due_date: this.datePipe.transform(this.dueDate, 'dd/MM/yyyy'),
      created_at: null,
      reminder: this.reminder,
      status: '',
      priority: '',
    };

    console.log('---sentData--', newTask);
    this.onAddTask.emit(newTask);

    this.title = '';
    this.description = '';
    this.dueDate = null;
    this.reminder = false;
  }
}
