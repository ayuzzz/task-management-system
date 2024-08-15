import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Project } from '../../../models/project';

@Component({
  selector: 'projects-list-utilities',
  templateUrl: './projects-list-utilities.component.html',
  styleUrl: './projects-list-utilities.component.css',
})
export class ProjectsListUtilitiesComponent implements OnInit {
  @Input()
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  filterString: string = '';

  @Output()
  filterStringChangeEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.filteredProjects = this.projects;
  }

  filterProjects(): void {
    this.filterStringChangeEvent.emit(this.filterString);
  }
}
