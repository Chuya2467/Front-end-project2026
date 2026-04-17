import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonBackButton, IonCheckbox, IonLabel, IonItem } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-presets',
  templateUrl: './presets.page.html',
  styleUrls: ['./presets.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonBackButton, IonCheckbox, IonLabel, IonItem]
})
export class PresetsPage implements OnInit {
  tasks: any[] = [];

  constructor(private dataService: DataService) { }

  addTask(){

  }

  ngOnInit() {
    this.dataService.getPresetData().subscribe(
      (data: any) => {
        this.tasks = data;
      });
  }

}
