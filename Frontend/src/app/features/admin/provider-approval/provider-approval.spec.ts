import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderApproval } from './provider-approval';

describe('ProviderApproval', () => {
  let component: ProviderApproval;
  let fixture: ComponentFixture<ProviderApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderApproval],
    }).compileComponents();

    fixture = TestBed.createComponent(ProviderApproval);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
