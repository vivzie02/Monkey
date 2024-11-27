import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomTextComponent } from './random-text/random-text.component';
import { MonkeyOverviewComponent } from './monkey-overview/monkey-overview.component';

const routes: Routes = [
  { path: 'random-text', component: RandomTextComponent},
  { path: 'monkey-overwiew', component: MonkeyOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
