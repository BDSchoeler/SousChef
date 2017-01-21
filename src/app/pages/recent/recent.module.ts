import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Recent } from './recent.component';
import { routing }       from './recent.routing';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [

    Recent
  ],
  providers: [

  ]
})
export default class RecentModule {}
