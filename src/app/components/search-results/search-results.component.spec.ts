import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { store } from '../../store';
import { SearchResultsComponent } from './search-results.component';
import { City } from '../../city';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          store,
        }),
      ],
      declarations: [SearchResultsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show waiting for input', () => {
    component.query = '';
    component.results = [];
    fixture.detectChanges();
    const hostElement = fixture.nativeElement;
    const message: HTMLInputElement = hostElement.querySelector('.card');
    expect(message.textContent).toMatch('To begin, search for a city name.');
  });

  it('should show no results found', () => {
    component.query = 'test';
    component.results = [];
    fixture.detectChanges();
    const hostElement = fixture.nativeElement;
    const message: HTMLInputElement = hostElement.querySelector('.card');
    expect(message.textContent).toMatch("Couldn't find any results for test");
  });

  it('should render weather cards if results found', () => {
    component.query = 'test';
    component.results = [
      {
        id: 1,
        name: 'halifax',
        sys: {
          country: 'canada',
        },
        coord: {
          lat: 1,
          lon: 1,
        },
        main: {
          temp: 1,
          feels_like: 1,
          temp_min: 1,
          temp_max: 1,
          pressure: 1,
          humidity: 1,
        },
        dt: 1,
        wind: {
          speed: 1,
          deg: 1,
        },
        weather: [
          {
            id: 0,
            main: 'string',
            description: 'string',
            icon: 'string',
          },
        ],
      },
    ];
    fixture.detectChanges();
    const hostElement = fixture.nativeElement;
    const results: NodeList = hostElement.querySelectorAll('weather-card');
    expect(results).toHaveSize(1);
  });
});
