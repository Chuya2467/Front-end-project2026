import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonButton, IonInput } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonButton, RouterLink, IonInput]
})
export class AddTaskPage implements OnInit {
  newTaskTitle: string = "";

  constructor(private storage:Storage, private router: Router) { }

  async addTask(){
    if(!this.newTaskTitle) return;

    const newTask = {
      id: Date.now(),
      title: this.newTaskTitle,
      completed: false
    };

    await this.storage.create();
    let tasks = await this.storage.get("tasks") || [];
    tasks.push(newTask);
    await this.storage.set("tasks", tasks);

    console.log("Saved tasks: ", tasks);

    this.newTaskTitle = "";

    this.router.navigate(["/"]);
  }
  
  async ionViewWillEnter(){
    await this.storage.create();
  }

  async ngOnInit() {
    await LocalNotifications.requestPermissions();
  }

}
