import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Claim } from '@shared/viewModel/claim.model';
import { ListOf } from '@shared/viewModel/list-of.model';
import { Operation } from 'fast-json-patch';
import { Observable } from 'rxjs';

import { EventHistoryData } from '../viewModel/event-history-data.model';
import { ResetPassword } from '../viewModel/reset-password.model';
import { UserLogin } from '../viewModel/user-login.model';
import { UserRole } from '../viewModel/user-role.model';
import { ListOfUsers, UserProfile } from '../viewModel/userProfile.model';

@Injectable()
export class UserService {


    endpoint: string;
    endpointSignUp: string;

    constructor(private http: HttpClient) {
        this.endpoint = environment.ResourceServer + "admin/users";
        this.endpointSignUp = environment.ResourceServer + "sign-up";
    }


    public getUsers(quantity: number, page: number): Observable<ListOfUsers> {
        return this.http.get<ListOfUsers>(`${this.endpoint}?limit=${quantity}&offset=${(page - 1) * quantity}`);
    }

    public findUsers(text: string, quantity: number, page: number): Observable<ListOfUsers> {
        return this.http.get<ListOfUsers>(`${this.endpoint}?limit=${quantity}&offset=${(page - 1) * quantity}&search=${encodeURI(text)}`);
    }

    public getDetails(username: string): Observable<UserProfile> {
        return this.http.get<UserProfile>(`${this.endpoint}/${username}`);
    }

    public update(username: string, updateCommand: UserProfile): Observable<boolean> {
        return this.http.put<boolean>(`${this.endpoint}/${username}`, updateCommand);
    }

    public patch(username: string, patch: Operation[]): Observable<boolean> {
        return this.http.patch<boolean>(`${this.endpoint}/${username}`, patch);
    }

    public save(model: UserProfile): Observable<UserProfile> {
        return this.http.post<UserProfile>(`${this.endpointSignUp}`, model);
    }

    public remove(id: string): Observable<void> {
        return this.http.delete<void>(`${this.endpoint}/${id}`);
    }

    public getUserClaims(userName: string): Observable<Claim[]> {
        return this.http.get<Claim[]>(`${this.endpoint}/${userName}/claims`);
    }

    public removeClaim(username: string, type: string): Observable<void> {
        return this.http.delete<void>(`${this.endpoint}/${username}/claims/${type}`);
    }

    public saveClaim(username, model: Claim): Observable<Claim> {
        return this.http.post<Claim>(`${this.endpoint}/${username}/claims`, model);
    }

    public getUserRoles(userName: string): Observable<UserRole[]> {
        return this.http.get<UserRole[]>(`${this.endpoint}/${userName}/roles`);
    }

    public removeRole(username: string, role: string): Observable<void> {
        return this.http.delete<void>(`${this.endpoint}/${username}/roles/${role}`);
    }

    public saveRole(username: string, model: UserRole): Observable<boolean> {
        return this.http.post<boolean>(`${this.endpoint}/${username}/roles`, model);
    }

    public getUserLogins(username: string): Observable<UserLogin[]> {
        return this.http.get<UserLogin[]>(`${this.endpoint}/${username}/logins`);
    }

    public removeLogin(userName: string, loginProvider: string, providerKey: string): any {
        return this.http.delete<void>(`${this.endpoint}/${userName}/logins?loginProvider=${loginProvider}&providerKey=${providerKey}`);
    }

    public checkUserName(userName: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.endpoint}/check-username/${userName}`);
    }

    public checkEmail(email: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.endpoint}/check-email/${email}`);
    }

    public resetPassword(username: string, resetPassword: ResetPassword): Observable<boolean> {
        return this.http.put<boolean>(`${this.endpoint}/${username}/password`, resetPassword);
    }

    public showEvents(username: string, quantity: number, page: number): Observable<ListOf<EventHistoryData>> {
        return this.http.get<ListOf<EventHistoryData>>(`${this.endpoint}/${username}/logs?limit=${quantity}&offset=${(page - 1) * quantity}`);
    }
    
    public searchEvents(username: string, text: string, quantity: number, page: number): Observable<ListOf<EventHistoryData>> {
        return this.http.get<ListOf<EventHistoryData>>(`${this.endpoint}/${username}/logs?limit=${quantity}&offset=${(page - 1) * quantity}&search=${encodeURI(text)}`);
    }
}
