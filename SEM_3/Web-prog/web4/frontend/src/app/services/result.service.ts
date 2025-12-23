import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PointRequest, ResultResponse } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private apiUrl = 'http://localhost:8080/api/results';

  constructor(private http: HttpClient) {}

  checkPoint(request: PointRequest): Observable<ResultResponse> {
    console.log('ResultService: checkPoint - Sending POST request to:', `${this.apiUrl}/check`);
    console.log('ResultService: checkPoint - Request data:', request);
    return this.http.post<ResultResponse>(`${this.apiUrl}/check`, request);
  }

  getResults(): Observable<ResultResponse[]> {
    return this.http.get<ResultResponse[]>(this.apiUrl);
  }

  clearResults(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }
}


