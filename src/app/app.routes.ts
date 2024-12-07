import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { FirstComponent } from './first/first.component';
import { AccountComponent } from './account/account.component';
import { PlaceComponent } from './place/place.component';
import { TypeComponent } from './type/type.component';
import { UserComponent } from './user/user.component';
import { LugarComponent } from './lugar/lugar.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'categorias',
        component: CategoriasComponent
    },
    {
        path: 'first',
        component: FirstComponent
    },
    {
        path: 'account',
        component: AccountComponent
    },
    {
        path: 'place',
        component: PlaceComponent
    },
    {
        path: 'type',
        component: TypeComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'lugar',
        component: LugarComponent
    },
    {
        path: 'dash-user',
        loadChildren: () => import('./dash-user/dash-user.module').then(m => m.DashUserModule)
    },
    {
        path: 'dash-place',
        loadChildren: () => import('./dash-place/dash-place.module').then(m => m.DashPlaceModule)
    },
    {
        path: 'dash-admin',
        loadChildren: () => import('./dash-admin/dash-admin.module').then(m => m.DashAdminModule)
    },
    {
        path: '**',
        redirectTo: ''
    },
    {
        path: '*',
        redirectTo: ''
    }
];
