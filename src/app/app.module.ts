import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import { formatDate, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';

import LocaleCO from '@angular/common/locales/es-CO';

registerLocaleData(LocaleCO,'es-CO');

const routes: Routes=[
  {path:'',redirectTo:'/clientes',pathMatch:'full'},
  {path:'directivas',component: DirectivaComponent},
  {path:'clientes',component: ClientesComponent},
  {path:'clientes/form',component: FormComponent},
  {path:'clientes/form/:id',component: FormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es-CO' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
