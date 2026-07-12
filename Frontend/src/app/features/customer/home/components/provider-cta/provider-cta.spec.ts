import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProviderCta } from "./provider-cta";

describe("ProviderCta", () => {
  let component: ProviderCta;
  let fixture: ComponentFixture<ProviderCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderCta],
    }).compileComponents();

    fixture = TestBed.createComponent(ProviderCta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
