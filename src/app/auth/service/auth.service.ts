import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../interface/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


export interface Usuario {
  uid: string;
  email: string;
  name: string;
  role: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<Usuario | null>(null);
  user$: Observable<Usuario | null> = this.userSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.fetchUserData(user.uid);
      } else {
        this.userSubject.next(null);
      }
    });
  }

  // Método que recupera los datos del usuario y actualiza el BehaviorSubject
  fetchUserData(uid: string) {
    this.getUserData(uid).subscribe((userData: Usuario | null) => {
      this.userSubject.next(userData);
    });
  }

  register(email: string, password: string, name: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user?.uid;
        if (uid) {
          return this.firestore.collection('usuarios').doc(uid).set({
            uid: uid,
            email: email,
            name: name,
            role: 'user'
          });
        } else {
          throw new Error('No se pudo obtener el UID del usuario');
        }
      })
      .catch(error => {
        console.error('Error en registro: ', error);
      });
  }

  registert(email: string, password: string, name: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user?.uid;
        if (uid) {
          return this.firestore.collection('usuarios').doc(uid).set({
            uid: uid,
            email: email,
            name: name,
            role: 'tecnico'
          });
        } else {
          throw new Error('No se pudo obtener el UID del usuario');
        }
      })
      .catch(error => {
        console.error('Error en registro: ', error);
      });
  }

  login(email: string, password: string): Promise<void | undefined> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user?.uid;
        if (uid) {
          // Consultar Firestore para obtener el rol del usuario
          return this.firestore.collection('usuarios').doc(uid).get().toPromise()
            .then((doc) => {
              if (doc && doc.exists) {
                const userData = doc.data() as Usuario;
                this.userSubject.next(userData);
                const role = userData?.role;

                // Redirigir según el rol
                if (role === 'superadmin') {
                  this.router.navigate(['/adminpage']);
                } else if (role === 'user') {
                  this.router.navigate(['/']);
                } else {
                  this.router.navigate(['/error']);
                }
              } else {
                console.error('No se encontró el documento para el UID:', uid);
                alert('No se pudo encontrar la información del usuario');
                return undefined;
              }
            });
        } else {
          console.error('No se pudo obtener el UID del usuario');
          alert('Error: No se pudo obtener el UID del usuario');
          return undefined;
        }
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
        alert('Usuario o contraseña incorrectos');
        return undefined;
      });
  }


  logout() {
    return this.afAuth.signOut().then(() => {
      this.userSubject.next(null);
    }).catch((error) => {
      console.error('Error al cerrar sesión', error);
      throw error;
    });
  }

 getUserData(uid: string): Observable<Usuario | null> {
    return this.firestore.collection('usuarios').doc<Usuario>(uid).valueChanges().pipe(
      map(userData => userData ? { ...userData } : null)
    );
  }
}
