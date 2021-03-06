import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITaskSet, TaskSet } from 'app/shared/model/task-set.model';
import { TaskSetService } from '../../services/task-set.service';

import { TaskSetDetailComponent } from './task-set-detail/task-set-detail.component';
import { TaskSetUpdateComponent } from './task-set-update/task-set-update.component';
import { TaskSetDeletePopupComponent } from './task-set-delete-dialog/task-set-delete-dialog.component';
import { TaskSetListComponent } from 'app/features/quiz-manager/task-set/task-set-list/task-set-list.component';

@Injectable({ providedIn: 'root' })
export class TaskSetResolve implements Resolve<ITaskSet> {
    constructor(private service: TaskSetService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((taskSet: HttpResponse<TaskSet>) => taskSet.body));
        }
        return of(new TaskSet());
    }
}

@Injectable({ providedIn: 'root' })
export class TaskSetQuizIdResolve implements Resolve<number> {
    constructor() {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return route.params['quiz-id'] ? route.params['quiz-id'] : null;
    }
}

export const taskSetRoute: Routes = [
    {
        path: 'quiz-manager/:quiz-id/task-set',
        component: TaskSetListComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,desc',
            pageTitle: 'TaskSets',
            state: 'task-set'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz-manager/:quiz-id/task-set/:id/view',
        component: TaskSetDetailComponent,
        resolve: {
            taskSet: TaskSetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TaskSets',
            state: 'task-set-details'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz-manager/:quiz-id/task-set/new',
        component: TaskSetUpdateComponent,
        resolve: {
            taskSet: TaskSetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TaskSets',
            state: 'task-set-new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz-manager/:quiz-id/task-set/:id/edit',
        component: TaskSetUpdateComponent,
        resolve: {
            taskSet: TaskSetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TaskSets',
            state: 'task-set-edit'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taskSetPopupRoute: Routes = [
    {
        path: 'quiz-manager/:quiz-id/task-set/:id/delete',
        component: TaskSetDeletePopupComponent,
        resolve: {
            taskSet: TaskSetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TaskSets',
            state: 'task-set-delete'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
