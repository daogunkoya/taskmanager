import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task.model';
import { TaskApi } from '../../models/TaskApi.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  totalTaskCount:number = 0;
  filteredTasks: any[] = []; // new filteredTasks array
  

  constructor(private taskService: TaskService) {
    
  }

  ngOnInit(): void {
    
    this.taskService.getTasks().subscribe((res) =>{
      console.log('DATA',res )
      const {count, tasks} = res
      this.tasks = tasks
      this.totalTaskCount = count
      this.filteredTasks = tasks; // initialize filteredTasks with all tasks
    } );
  }

  deleteTask(task: Task) {
    
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.task_id !== task.task_id))
      );
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }



  filterTasks(filterCriteria: { status: string, priority: string, deadline: string }): void {

    const {status = "", priority = "", deadline} = filterCriteria

    // let filtered = this.tasks;

    // // filter by status
    // if (filterCriteria.status !== 'All') {
    //   filtered = filtered.filter(t => t.status === filterCriteria.status);
    // }

    // // filter by priority
    // if (filterCriteria.priority !== 'All') {
    //   filtered = filtered.filter(t => t.priority === filterCriteria.priority);
    // }

    // // filter by deadline
    // if (filterCriteria.deadline !== '') {
    //   filtered = filtered.filter(t => t.due_date === filterCriteria.deadline);
    // }

    //this.filteredTasks = filtered;
   

    this.taskService.filterTasks(status, priority, deadline).subscribe((res) =>{
      console.log('FILTERED-DATA',res )
      const {count, tasks} = res
      this.tasks = tasks
      this.totalTaskCount = count
      this.filteredTasks = tasks; // initialize filteredTasks with all tasks
    } );

    
  }
}
