import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [],
  imports: [ FontAwesomeModule ],
    exports: [ FontAwesomeModule ],
})
export class CustomIconModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
}
}