import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  listId!: string;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) => this.listId = params['listId']);
   }

  ngOnInit(): void {
  }

  addTask(value: string){
    this.taskService.createTasks(this.listId, value)
    .subscribe(() => this.router.navigate(['../'], {relativeTo: this.route}));
  }
}
