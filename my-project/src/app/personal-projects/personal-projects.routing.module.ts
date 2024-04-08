import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PersonalProjectsComponent } from "./personal-projects.component";
import { AuthActivate } from "../guards/auth.activate";
import { CurrentProjectComponent } from "../projects/current-project/current-project.component";

const routes: Routes = [
    {
        path: 'personalProjects',
        children: [
            { path: '', pathMatch: 'full', component: PersonalProjectsComponent, canActivate: [AuthActivate] },
            {path: '":projectId', component: CurrentProjectComponent, canActivate:[AuthActivate]}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PersonalProjectsRouting { }