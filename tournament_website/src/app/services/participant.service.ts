import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Timestamp } from 'rxjs';

export interface ParticipantDb {
  player1_name: string;
  player2_name: string;
  phone_number?: number | null;
  category: string;
  created_at?: string | null;
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

  getAllParticipants(): Observable<ParticipantDb[]> {
    return this.http.get<ParticipantDb[]>(this.apiUrl);
  }
}
