import { Component, OnInit } from '@angular/core';
import { ChecklistService } from '../services/checklist.service';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  checklists: any;
  item: any;
  list: any;
  checklistname: string;
  finished: boolean;
  open: boolean;
  edit: boolean;

  constructor(private checklistServ : ChecklistService){
    this.list = [];
    this.item = {};
    this.edit = false;
    this.finished = false;
  }
  
  addNewItem(item?, list?){
    if(this.item){
      this.item.done = false;
      this.list.push(this.item);
      console.log('item is', this.item);
    }

    this.item = {};
  }

  checkItem(event, checklistIndex, itemIndex){    
    let doneAll: boolean = false;    
    this.checklists[checklistIndex].checklist[itemIndex].done =
    !this.checklists[checklistIndex].checklist[itemIndex].done
  }

  editChecklist(checklist_id){
    this.edit = !this.edit;
  }

  updateChecklist(checklist_id, checklist){    
    this.checklistServ.updateChecklist(checklist_id, checklist)
    .subscribe(res => {
      console.log('checklist successfully saved', res);
      this.getAllChecklists();
    })
  }

  getAllChecklists(){
    this.checklistServ.getChecklists(1).subscribe(res => {      
      this.checklists = res;
      for(let i=0;i<this.checklists.length;i++){      
        this.checklists[i].checklist = JSON.parse(this.checklists[i].checklist);        
      }
      console.log(this.checklists);      
    })
  }

  showChecklist(clist){
    this.open = !this.open;    
  }

  deleteChecklist(checklist_id){
    this.checklistServ.deleteChecklist(checklist_id, 1).subscribe(res => {
      console.log(res);
      this.getAllChecklists();
    })
  }
  
  ngOnInit() {
    this.getAllChecklists();
    this.open = false;
  }

}
