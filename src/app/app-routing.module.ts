import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search/search.component';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './home/home/home.component';
// import { authGuard } from './_guard/autorizado.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './utils/guard';

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo: 'home'},
  { path: 'home',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/login',
    component: LoginComponent
  },
  {
    path: 'users',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
