import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProjectsComponent } from "./projects.component";
import { AuthActivate } from "../guards/auth.activate";
import { CurrentProjectComponent } from "./current-project/current-project.component";

const routes: Routes = [
    {
        path:'projects', 
        children: [
            {path: '', pathMatch:'full', component: ProjectsComponent}
        ]
    },
    {
        path: 'projects/details',
        children: [
            {path:'', pathMatch:'full', component: CurrentProjectComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProjectsRouting {}