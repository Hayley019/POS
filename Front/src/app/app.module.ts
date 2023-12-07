import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ContableComponent } from './pages/contable/contable.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateComponent } from './pages/products/create/create.component';
import { ProductsComponent } from './pages/products/products.component';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';
import { VentasComponent } from './pages/ventas/ventas.component';

import { CreateComponent as CreateProduct } from './pages/products/create/create.component';
import { CreateComponent as CreateVenta } from './pages/ventas/create/create.component';
import { CreateComponent as CreateGasto } from './pages/gastos/create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavbarComponent,
    ProductsComponent,
    VentasComponent,
    EstadisticasComponent,
    CreateProduct,
    CreateVenta,
    LoginComponent,
    SucursalesComponent,
    CategoriasComponent,
    CreateComponent,
    GastosComponent,
    CreateGasto,
    ContableComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
