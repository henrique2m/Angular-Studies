import { element } from 'protractor';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { PhotoFrameComponent } from './photo-frame.component';
import { PhotoFrameModule } from './photo-frame.module';

describe(PhotoFrameComponent.name, () => {
  let fixture: ComponentFixture<PhotoFrameComponent> = null;
  let component: PhotoFrameComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFrameModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`#${PhotoFrameComponent.prototype.like.name}
    should trigger (@Output liked) once when called
    multiple times within debounce time
  `, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0;

    component.liked.subscribe(() => times++);
    component.like();
    component.like();

    tick(500);
    expect(times).toBe(1);
  }));

  it(`#${PhotoFrameComponent.prototype.like.name}
    should trigger (@Output liked) two times when called
    outside debounce time
  `, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0;

    component.liked.subscribe(() => times++);
    component.like();
    tick(500);
    component.like();

    tick(500);
    expect(times).toBe(2);
  }));

  it('should display number ogf likes when (@Input likes) is incremented', () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();

    const element: HTMLElement =
      fixture.nativeElement.querySelector('.like-counter');

    expect(element.textContent.trim()).toBe('1');
  });

  it(`should update aria-label when (@Input likes) is incremented`, () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('1: people liked');
  });

  it(`should have aria-label with 0 (@Input likes)`, () => {
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('0: people liked');
  });
});
