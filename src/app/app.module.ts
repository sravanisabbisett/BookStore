import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card'
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import{MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { from } from 'rxjs';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GetbooksComponent } from './components/getbooks/getbooks.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import { HeadersComponent } from './components/headers/headers.component';
import { OrderComponent } from './components/order/order.component';
import {MatTableModule} from '@angular/material/table';
import { MycartComponent } from './components/mycart/mycart.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    GetbooksComponent,
    HeadersComponent,
    OrderComponent,
    MycartComponent,
  ],
  imports: [
    BrowserModule,MatTableModule,MatExpansionModule,MatRadioModule,
    AppRoutingModule,HttpClientModule,MatTooltipModule,MatBadgeModule,
    BrowserAnimationsModule,MatToolbarModule,
    MatFormFieldModule,MatInputModule,MatCardModule,MatIconModule,ReactiveFormsModule,FormsModule,MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
