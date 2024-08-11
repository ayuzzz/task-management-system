import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsPageprojectsListComponent } from './projects-pageprojects-list.component';

describe('ProjectsPageprojectsListComponent', () => {
  let component: ProjectsPageprojectsListComponent;
  let fixture: ComponentFixture<ProjectsPageprojectsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsPageprojectsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsPageprojectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
