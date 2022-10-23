import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home.component';
import { AuthService, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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
      declarations: [ HomeComponent ],
      imports: [HttpClientModule, RouterTestingModule ],
      providers: [HttpClientModule, AuthService, {
        provide: AuthServiceConfig,
        useFactory: provideConfig
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
