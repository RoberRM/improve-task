import { TestBed, async } from '@angular/core/testing';

import { UsersManagementService } from './users-management.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('UsersManagementService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersManagementService = TestBed.get(UsersManagementService);
    expect(service).toBeTruthy();
  });
});
