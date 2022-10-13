import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from '@core';
import { AuthGuard } from '@guards';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule), canActivate: [AuthGuard] },
  { path: 'contacts/:show', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule), canActivate: [AuthGuard] },
  { path: 'transfers', loadChildren: () => import('./transfers/transfers.module').then(m => m.TransfersModule), canActivate: [AuthGuard] },
  { path: 'history', loadChildren: () => import('./history/history.module').then(m => m.HistoryModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
