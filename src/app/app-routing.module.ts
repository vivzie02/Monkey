import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomTextComponent } from './random-text/random-text.component';
import { MonkeyOverviewComponent } from './monkey-overview/monkey-overview.component';
import { StartPageComponent } from './start-page/start-page.component';

const routes: Routes = [
  { path: '', component: StartPageComponent},
  { path: 'random-text', component: RandomTextComponent},
  { path: 'monkey-overview', component: MonkeyOverviewComponent},
  { path: 'start-page', component: StartPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
