import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCheckbox, IonItem, IonList, IonLabel } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Storage } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';
import { LocalNotifications } from '@capacitor/local-notifications';

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

  async sendNotifications(){
    const pending = this.tasks.filter(t => !t.completed);

    if(pending.length === 0) return;
    if(pending.length === this.tasks.length) return;

    const preview = pending.slice(0,3).map(t => t.title).join(', ');
    const more = pending.length > 3 ? ` +${pending.length - 3} more` : '';

    await LocalNotifications.schedule({
      notifications: [
        {
          id: Date.now(),
          title: 'Your tasks',
          body: preview + more
        }
      ]
    });
  }

  async updateTasks(){
    await this.storage.set('tasks', this.tasks);
  }

  async deleteTask(index: number){
    this.tasks.splice(index, 1);
    await this.storage.set('tasks', this.tasks);
  }

  async ionViewWillEnter(){
    await this.storage.create();
    this.tasks = await this.storage.get("tasks") || [];

    console.log("Saved tasks: ", this.tasks);

    await this.sendNotifications();
  }

  ngOnInit() {
    LocalNotifications.requestPermissions();

  }
}
