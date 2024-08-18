import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsListUtilitiesComponent } from './projects-list-utilities.component';

describe('ProjectsListUtilitiesComponent', () => {
  let component: ProjectsListUtilitiesComponent;
  let fixture: ComponentFixture<ProjectsListUtilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsListUtilitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsListUtilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
