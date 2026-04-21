import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCheckbox, IonItem, IonList, IonLabel } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Storage } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, IonButton, IonCheckbox, IonItem, IonList, IonLabel, FormsModule],
})

export class HomePage {
  tasks: any[] = [];

  constructor(private storage:Storage) {}

  async ionViewWillEnter(){
    await this.storage.create();
    this.tasks = await this.storage.get("tasks") || [];

    console.log("Saved tasks: ", this.tasks);
  }
}
