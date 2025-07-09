import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Timestamp } from 'rxjs';

export interface ParticipantDb {
  id?: number;
  team_name?: string | null;
  district?: string | null;
  player1_name: string;
  player2_name: string;
  phone_number?: number | null;
  category: string;
  comment?: string | null;
  created_at?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  // private apiUrl = 'http://localhost:3000/api/participants';
  private baseUrl = 'https://padelhive-node.onrender.com/api/participants';

  constructor(private http: HttpClient) {}

  addParticipant(data: ParticipantDb): Observable<ParticipantDb> {
    return this.http.post<ParticipantDb>(this.baseUrl, data);
  }

  getAllParticipants(): Observable<ParticipantDb[]> {
    return this.http.get<ParticipantDb[]>(this.baseUrl);
  }

  deleteParticipant(
    id: number
  ): Observable<{ msg: string; participant: ParticipantDb }> {
    return this.http.delete<{ msg: string; participant: ParticipantDb }>(
      `${this.baseUrl}/${id}`
    );
  }

  updateParticipant(
    id: number,
    participant: Omit<ParticipantDb, 'id' | 'created_at'>
  ): Observable<ParticipantDb> {
    return this.http.put<ParticipantDb>(`${this.baseUrl}/${id}`, participant);
  }

}
