import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { store } from '../../store';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          store,
        }),
        HttpClientTestingModule,
        FormsModule,
      ],
      declarations: [SearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle metric to imperial', () => {
    const hostElement = fixture.nativeElement;
    const toggle: HTMLInputElement =
      hostElement.querySelector('.switch > input');
    toggle.click();

    expect(component.metric).toBe(false);
  });
});
