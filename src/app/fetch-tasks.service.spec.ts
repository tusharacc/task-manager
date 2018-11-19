import { TestBed } from '@angular/core/testing';

import { FetchTasksService } from './fetch-tasks.service';

describe('FetchTasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchTasksService = TestBed.get(FetchTasksService);
    expect(service).toBeTruthy();
  });
});
