import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTasksListComponent } from './recent-tasks-list.component';

describe('RecentTasksListComponent', () => {
  let component: RecentTasksListComponent;
  let fixture: ComponentFixture<RecentTasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentTasksListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
