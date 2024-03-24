import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactsComponent } from "./contacts.component";
import { AuthActivate } from "../guards/auth.activate";

const routes: Routes = [
    {
        path:'contacts', 
        children: [
            {path: '', pathMatch:'full', component: ContactsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ContactsRouting {}