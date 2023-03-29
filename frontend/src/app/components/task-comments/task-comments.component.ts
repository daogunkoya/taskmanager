import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-comments',
  templateUrl: './task-comments.component.html',
  styleUrls: ['./task-comments.component.css'],
})
export class TaskCommentsComponent implements OnInit {
  @Input() taskId: any;
  comments: any[];
  comment: string = "";

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTaskComments(this.taskId).subscribe((data: any) => {
     
      this.comments = data;
    });
  }

  onSubmit(): void {
    const newComment = this.comment;
    this.taskService.addTaskComment(newComment, this.taskId).subscribe((comment: any) => {
      this.comments.push(comment);
      this.comment = '';
    });
  }
}
