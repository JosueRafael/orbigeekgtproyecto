import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../auth/service/auth.service';
import { UserService } from '../../auth/service/user.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-registrotecnico',
  templateUrl: './registrotecnico.component.html',
  styleUrls: ['./registrotecnico.component.css']
})
export class RegistrotecnicoComponent implements OnInit{
  name: string = '';
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  confirmPassword: string = '';
  confirmPasswordVisible: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  showPassword: boolean = false;

  hasUpperCase: boolean = false;
  hasLowerCase: boolean = false;
  hasNumber: boolean = false;
  hasMinLength: boolean = false;

  tecnicos: any[] = []; // Arreglo para almacenar los técnicos en tiempo real

  userName: string | undefined;

  constructor(private firestore: AngularFirestore, private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user?.role === 'superadmin') {
        console.log('Usuario autenticado es superadmin');
        this.cargarTecnicos();
      } else {
        console.error('Acceso denegado: el usuario no es superadmin');
      }
    });
  }
  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
    if (this.name && this.email && this.password) {
      this.authService.registert(this.email, this.password, this.name)
        .then(() => {
          this.successMessage = 'Tecnico registrado exitosamente.';
          this.errorMessage = '';
          this.resetForm();
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
  resetForm() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.hasUpperCase = false;
    this.hasLowerCase = false;
    this.hasNumber = false;
    this.hasMinLength = false;
  }

  validatePassword() {
    const password = this.password;

    this.hasUpperCase = /[A-Z]/.test(password);   // Al menos una mayúscula
    this.hasLowerCase = /[a-z]/.test(password);   // Al menos una minúscula
    this.hasNumber = /[0-9]/.test(password);      // Al menos un número
    this.hasMinLength = password.length >= 8;     // Longitud mínima de 8 caracteres
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    const passwordInput = document.getElementById('contrasena') as HTMLInputElement;
    passwordInput.type = this.passwordVisible ? 'text' : 'password';
  }
  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
    const confirmPasswordInput = document.getElementById('contrasena-confirm') as HTMLInputElement;
    confirmPasswordInput.type = this.confirmPasswordVisible ? 'text' : 'password';
  }




  cargarTecnicos() {
    this.firestore.collection('usuarios', ref => ref.where('role', '==', 'tecnico'))
      .snapshotChanges()
      .subscribe(users => {
        this.tecnicos = users.map(user => {
          const data = user.payload.doc.data() as object;
          const id = user.payload.doc.id;
          return { id, ...data };
        });
      });
  }


  eliminarTecnico(id: string) {
    this.firestore.collection('usuarios').doc(id).delete()
      .then(() => {
        console.log('Técnico eliminado exitosamente');
        this.ngOnInit();
      })
      .catch(error => {
        console.error('Error al eliminar el técnico: ', error);
      });
  }


  onLogout() {
    this.authService.logout().then(() => {
      alert('Sesión cerrada con éxito');
      this.router.navigate(['/catalogo']);
      this.router.navigate(['/']);
    }).catch((error) => {
      console.error('Error al cerrar sesión', error);
    });
  }



}
