import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ViewProfileComponent } from "./view-profile";

describe("ViewProfileComponent", () => {
  let component: ViewProfileComponent;
  let fixture: ComponentFixture<ViewProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewProfileComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
