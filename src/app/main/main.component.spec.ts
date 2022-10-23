import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MainComponent } from './main.component';
import { AuthService, AuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

describe('MainComponent', () => { 
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  function provideConfig() {
    return config;
  }
  const googleLoginOptions = {
    scope: 'profile email',
    plugin_name:'login'
  }; 
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("498683162143-e11m9035v55gro03ptbjug8h5stvn2ql.apps.googleusercontent.com", googleLoginOptions),
    }
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      imports: [HttpClientTestingModule, SocialLoginModule],
      providers: [AuthService, {
        provide: AuthServiceConfig,
        useFactory: provideConfig
      }, MatSnackBar, Overlay]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
