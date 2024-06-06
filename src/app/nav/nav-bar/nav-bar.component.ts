import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog ,} from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/utils/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  private buttonLogin = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  isLogged(): boolean {
    return this.authService.isLoggedIn();
  }


  logout(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: 'Deseja realmente sair?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.isLogout();
        this.snackBar.open('Logout efetuado com sucesso!', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.router.navigate(['home']);
      }
    });
  }
}
