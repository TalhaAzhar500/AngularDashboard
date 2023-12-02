import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from 'src/app/home/home.component';
import { AdminsComponent } from 'src/app/admins/admins.component';
import { ModalComponent } from 'src/app/admins/modal/modal.component';
import { MembersComponent } from 'src/app/members/members.component';
import { MemberModalComponent } from 'src/app/members/member-modal/member-modal.component';
import { ProjectsModalComponent } from 'src/app/members/projects-modal/projects-modal.component';
import { ProjectsComponent } from 'src/app/projects/projects.component';
import { ProjectModalComponent } from 'src/app/projects/project-modal/project-modal.component';
import { ResetPasswordComponent } from 'src/app/reset-password/reset-password.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    HomeComponent,
    AdminsComponent,
    ModalComponent,
    MembersComponent,
    MemberModalComponent,
    ProjectsModalComponent,
    ProjectsComponent,
    ProjectModalComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule,
    MatButtonModule,
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
  ],
})
export class DashboardModule {}
