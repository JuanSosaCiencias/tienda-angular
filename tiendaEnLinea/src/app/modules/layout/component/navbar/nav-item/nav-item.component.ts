import { Component, Input, OnChanges } from '@angular/core';
import { NavService } from '../../../_service/nav.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavItem } from './nav-item';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css'
})
export class AppNavItemComponent implements OnChanges {
  @Input() item: NavItem | any;
  
  constructor( public navService: NavService, public router: Router, private route: ActivatedRoute) {}
  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => {});
  }
  onItemSelected(item: NavItem) {
      this.router.navigate([item.route]);
  }
  onSubItemSelected(item: NavItem) {}
}