import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form groups', () => {
    expect(component.registerForm).toBeDefined();
    expect(component.loginForm).toBeDefined();
  });

  it('should set isSignDivVisiable to true by default', () => {
    expect(component.isSignDivVisiable).toBeTrue();
  });

  it('should call onRegister method when registerForm is submitted', () => {
    spyOn(component, 'onRegister');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(component.onRegister).toHaveBeenCalled();
  });

  it('should call onLogin method when loginForm is submitted', () => {
    spyOn(component, 'onLogin');
    const form = fixture.nativeElement.querySelectorAll('form')[1];
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(component.onLogin).toHaveBeenCalled();
  });

  it('should call onImageSelected method when file input changes', () => {
    spyOn(component, 'onImageSelected');
    const input = fixture.nativeElement.querySelector('input[type="file"]');
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.onImageSelected).toHaveBeenCalled();
  });
});
