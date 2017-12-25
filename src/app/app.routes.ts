import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { BoardsComponent} from './components/boards/boards.component';
import { SignupComponent} from './components/signup/signup.component';
import {UserService} from "./services/user.service";
import {BoardComponent} from "./components/boards/board/board.component";


export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'board/:id', component: BoardComponent },
  { path: 'boards', component: BoardsComponent, canActivate: [UserService] },
  ]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
