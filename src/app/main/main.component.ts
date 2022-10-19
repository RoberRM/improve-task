import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersManagementService } from '../services/users-management.service';
import { User, Admin } from '../model/user';
import { AuthService } from "angularx-social-login";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private readonly unsubscribe$ = new Subject<any>();
  public reset_form: EventEmitter<boolean> = new EventEmitter();

  public currentUser: User;
  public loggedUser: String;
  public users: User[] = [];
  public admin: Admin = {
    fullName: '',
    admin_id: -1,
  };
  public selectedUser: any;

  constructor(private router: Router, 
              private usersManagementService: UsersManagementService, 
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
    this.currentUser = this.usersManagementService.getUserLogged();
    if (this.currentUser) {
      this.loggedUser = this.currentUser.name;
    } else {
      this.router.navigate(['']);
    }
  }
  
  public ngOnInit() {}
  
  public ngAfterContentInit() {
    this.getUsers();
    this.getAdmins();
  }

  public getUsers(): void {
    this.usersManagementService.getUsers()
    .pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((response: any) => {
      this.users = response.sort((a: any,b: any) =>{
        return b.id - a.id
      });
  });
  }

  public getAdmins(): void {
    this.usersManagementService.getAdmins().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((response: any) => {
      this.admin = response.find((admin: any) => admin.fullName === this.loggedUser);
    });
  }

  public openUserDetails(user: User) {
    this.selectedUser = user;
  }

  public addNewUser() {
    this.selectedUser = null;
    this.reset_form.emit(true);
  }

  public logout() {
    this.authService.signOut().then(() => {
      localStorage.removeItem('userLogged');
      this.router.navigate(['']);
    });
  }
  
  public saveNewUSer(newUser: any) {

    const userToPush: any = {
      name: newUser.userForm.controls.userName.value,
      lastName: newUser.userForm.controls.userLastName.value,
      IBAN: newUser.userForm.controls.IBAN.value,
      admin_id: this.admin.admin_id
    }
    const orderedUsers = this.users.sort((a,b) =>{
      return b.id - a.id
    });
    if (newUser.edit) {
        const updateUser: any = this.users.find(user => user.id === this.selectedUser.id);
        userToPush.id = updateUser.id;
        this.usersManagementService.updateUser(userToPush).subscribe((response: any) => {
          updateUser.name = response.name; 
          updateUser.lastName = response.lastName; 
          updateUser.IBAN = response.IBAN;
          this.openSnackBar('Usuario actualizado correctamente', '');
        });
    } else {
      userToPush.id = orderedUsers[0].id + 1;
      this.usersManagementService.addUser(userToPush).subscribe((response: any) => {
        this.users.push(response);
        this.openSnackBar('Usuario añadido correctamente', '');
      });
    }
    this.selectedUser = null;
  }
  
  public deleteUSer(toDelete: any) {
    this.usersManagementService.deleteUser(toDelete).subscribe(() => {
      this.users = this.users.filter(item => item.id !== toDelete.user.id);
      this.openSnackBar('Usuario eliminado correctamente', '');
      this.selectedUser = null;
    })
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  public ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
