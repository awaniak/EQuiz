/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EQuizTestModule } from '../../../test.module';
import { TaskSet } from 'app/shared/model/task-set.model';
import { TaskSetDetailEntityComponent } from 'app/features/entities/task-set';

describe('Component Tests', () => {
    describe('TaskSet Management Detail Component', () => {
        let comp: TaskSetDetailEntityComponent;
        let fixture: ComponentFixture<TaskSetDetailEntityComponent>;
        const route = ({ data: of({ taskSet: new TaskSet(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EQuizTestModule],
                declarations: [TaskSetDetailEntityComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TaskSetDetailEntityComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaskSetDetailEntityComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.taskSet).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
