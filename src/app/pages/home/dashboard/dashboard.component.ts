import { Component, OnInit } from '@angular/core';
import { SimService } from '../sim.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  startedSim = false;

  constructor(
    private simService: SimService
  ) {}

  ngOnInit(): void {
    this.startedSim = this.simService.isStarted();
  }

  onStartClick(): void {
    this.simService.start()
    .subscribe({
      next: () => this.startedSim = true,
      error: (errorMessage) => alert(errorMessage)
    });
  }

  onStopClick(): void {
    this.simService.stop()
    .subscribe({
      next: () => this.startedSim = false,
      error: (errorMessage) => alert(errorMessage)
    });
  }
}
