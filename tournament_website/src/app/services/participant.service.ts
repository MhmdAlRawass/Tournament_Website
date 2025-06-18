import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ParticipantDb {
  category: string;
  phoneNumber: string;
  player1: string;
  player2: string;
}

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  private apiUrl = 'http://localhost:3000/api/participants';

  constructor(private http: HttpClient) {}

  addParticipant(data: ParticipantDb): Observable<ParticipantDb> {
    return this.http.post<ParticipantDb>(this.apiUrl, data);
  }
}
