import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomersComponent } from "./customers.component";
import { AuthActivate } from "../guards/auth.activate";

const routes: Routes = [
    {
        path:'customers', 
        children: [
            {path: '', pathMatch:'full', component: CustomersComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CustomersRouting {}