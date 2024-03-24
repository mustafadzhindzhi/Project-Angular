import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutUsComponent } from "./about-us.component";
import { AuthActivate } from "../guards/auth.activate";

const routes: Routes = [
    {
        path:'aboutUs', 
        children: [
            {path: '', pathMatch:'full', component: AboutUsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AboutUsRouting {}