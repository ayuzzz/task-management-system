import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.css',
})
export class AddEditTaskComponent implements OnInit {
  taskId: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('taskId')) ?? 0;
  }
}
