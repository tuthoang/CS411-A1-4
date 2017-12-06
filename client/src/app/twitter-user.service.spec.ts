import { TestBed, inject } from '@angular/core/testing';

import { TwitterUserService } from './twitter-user.service';

describe('TwitterUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwitterUserService]
    });
  });

  it('should be created', inject([TwitterUserService], (service: TwitterUserService) => {
    expect(service).toBeTruthy();
  }));
});
