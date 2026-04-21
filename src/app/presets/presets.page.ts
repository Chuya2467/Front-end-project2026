import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonBackButton, IonCheckbox, IonLabel, IonItem } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data-service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-presets',
  templateUrl: './presets.page.html',
  styleUrls: ['./presets.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonBackButton, IonCheckbox, IonLabel, IonItem]
})
export class PresetsPage implements OnInit {
  tasks: any[] = [];
  selectedTasks: any[] = [];

  constructor(private dataService: DataService, private router: Router, private storage: Storage) { }

  toggleTask(task: any, event: any){
    if(event.detail.checked){
      this.selectedTasks.push(task);
    }
    else{
      this.selectedTasks = this.selectedTasks.filter(t => t.id !== task.id);
    }
  }

  async addTask(){
    await this.storage.create();

    let existingTasks = await this.storage.get("tasks") || [];

    existingTasks.push(...this.selectedTasks);

    await this.storage.set("tasks", existingTasks);

    this.router.navigate(["/"]);
  }

  async ionViewWillEnter(){
    await this.storage.create();
  }

  ngOnInit() {
    this.dataService.getPresetData().subscribe(
      (data: any) => {
        this.tasks = data;
      });
  }

}
