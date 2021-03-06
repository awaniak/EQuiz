import {Injectable} from '@angular/core';
import {SERVER_API_URL} from 'app/app.constants';
import {IQuiz} from 'app/shared/model/quiz.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {QuizResolve} from 'app/shared/model/quiz-resolve.model';
import {StudentAnswer} from 'app/shared/model/student-answer.model';

@Injectable({
    providedIn: 'root'
})
export class QuizResolveService {
    private resourceUrl = SERVER_API_URL + 'api/resolve';

    constructor(private http: HttpClient) {}

    getQuizForResolve(quizId: number, studentId: number): Observable<HttpResponse<QuizResolve>> {
        return this.http.get<IQuiz>(`${this.resourceUrl}/${quizId}/${studentId}`, {observe: 'response'});
    }

    submit(quizId: number, answers: StudentAnswer[], studentId: number) {
        console.log(answers);
        return this.http.post<QuizResolve>(`${this.resourceUrl}/${quizId}/${studentId}`, answers, {observe: 'response'});
    }
}
