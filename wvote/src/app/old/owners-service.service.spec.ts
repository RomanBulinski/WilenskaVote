import { TestBed } from "@angular/core/testing";

import { OwnersServiceService } from "./owners-service.service";

describe("OwnersServiceService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: OwnersServiceService = TestBed.get(OwnersServiceService);
    expect(service).toBeTruthy();
  });
});
