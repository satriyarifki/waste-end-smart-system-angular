import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockBarangComponent } from './stock-barang.component';

describe('StockBarangComponent', () => {
  let component: StockBarangComponent;
  let fixture: ComponentFixture<StockBarangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockBarangComponent]
    });
    fixture = TestBed.createComponent(StockBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
