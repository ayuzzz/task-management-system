import { TestBed } from '@angular/core/testing';

import { StatusPriorityService } from './status-priority.service';

describe('StatusPriorityService', () => {
  let service: StatusPriorityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusPriorityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
