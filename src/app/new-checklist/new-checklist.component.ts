import { Component, OnInit } from '@angular/core';
import { ChecklistService } from '../services/checklist.service';
import { Observable, throwError } from 'rxjs';


@Component({
  selector: 'app-new-checklist',
  templateUrl: './new-checklist.component.html',
  styleUrls: ['./new-checklist.component.scss']
})
export class NewChecklistComponent implements OnInit {
  
  item: any;
  list: any;
  checklistname: string;
  finished: boolean;
  open: boolean;

  constructor(private checklistServ : ChecklistService){
    this.list = [];
    this.item = {};
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

  checkItem(event, itemName){
   console.log(itemName);
   let doneAll: boolean = false;
   let index = this.list.findIndex(item => item.name === itemName)
   //this.list[index].checked = event.target.checked;
   this.list[index].done = !this.list[index].done;

   for(let i=0;i<this.list.length;i++){
     if(!this.list[i].done){
       break;
     }

     if(i === this.list.length-1){
        doneAll = true;
     }
   }

   doneAll? this.finished=true:this.finished=false;
    
  }

  saveChecklist(){
    let checklist: any = {};
    checklist.user_id = 1;
    checklist.checklist_name = this.checklistname;
    checklist.checklist = this.list;
    this.checklistServ.InsertChecklist(checklist)
    .subscribe(res => {
      console.log('checklist successfully saved', res);      
    })
  }

  showChecklist(clist){
    this.open = !this.open;    
  }
  
  ngOnInit() {    
    this.open = false;
  }

}
