import { TestBed } from '@angular/core/testing';

import { CustomerImageService } from './customer-image.service';

describe('CustomerImageService', () => {
  let service: CustomerImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
