import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  user_id : string;
  constructor(private http: HttpClient) { }

  InsertChecklist(checklist){
    return this.http.post("http://localhost:3000/user/checklist", checklist);
  }

  getChecklists(user_id){
    return this.http.get("http://localhost:3000/user/checklist/" + user_id);
  }

  deleteChecklist(checklist_id, user_id?){
    return this.http.delete("http://localhost:3000/user/checklist/" + user_id + '/' + checklist_id);
  }

  updateChecklist(checklist_id, checklist){
    let data = {checklist_id: checklist_id, checklist: checklist} 
    return this.http.put("http://localhost:3000/user/checklist", data);
  }
}
