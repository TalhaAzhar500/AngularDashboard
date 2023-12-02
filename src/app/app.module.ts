import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminsComponent } from './admins/admins.component';
import { MembersComponent } from './members/members.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './admins/modal/modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './404/404.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectModalComponent } from './projects/project-modal/project-modal.component';
import { MemberModalComponent } from './members/member-modal/member-modal.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatSelectModule } from '@angular/material/select';
import { MenuComponent } from './common/menu/menu.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ForgotPasswordModalComponent } from './login/forgot-password-modal/forgot-password-modal.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProjectsModalComponent } from './members/projects-modal/projects-modal.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    SideNavbarComponent,
    HomeComponent,
    AdminsComponent,
    ModalComponent,
    MembersComponent,
    MemberModalComponent,
    ProjectsModalComponent,
    LoginComponent,
    ForgotPasswordModalComponent,
    NotFoundComponent,
    ProjectsComponent,
    ProjectModalComponent,
    ResetPasswordComponent,
    SignUpComponent,
    MenuComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    MatCardModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    ToastrModule.forRoot(),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
