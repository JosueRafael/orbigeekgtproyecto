import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../interface/user.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if (user && user.uid) {
        this.getUserData(user.uid).subscribe(userData => {
          if (userData) {
            this.userSubject.next(userData);
          } else {
            this.userSubject.next(null);
          }
        });
      } else {
        this.userSubject.next(null);
      }
    });
  }

  getUserData(uid: string) {
    return this.firestore.collection<User>('usuarios').doc(uid).valueChanges();
  }
}
