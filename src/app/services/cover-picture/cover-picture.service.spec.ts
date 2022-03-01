import { TestBed } from '@angular/core/testing';

import { CoverPictureService } from './cover-picture.service';

describe('CoverPictureService', () => {
  let service: CoverPictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoverPictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
