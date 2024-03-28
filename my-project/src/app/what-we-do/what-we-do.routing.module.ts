import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WhatWeDoComponent } from "./what-we-do.component";
import { AuthActivate } from "../guards/auth.activate";

const routes: Routes = [
    {
        path:'whatWeDo', 
        children: [
            {path: '', pathMatch:'full', component: WhatWeDoComponent},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class WhatWeDoRouting {}