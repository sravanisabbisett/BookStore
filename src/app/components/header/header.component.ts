import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  
})
export class HeaderComponent implements OnInit {

   
  header!: FormGroup;
  name:any;
  email:any;
  @Input() bag: any;
  list:any;
  constructor(private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.header=this.formbuilder.group({
      dataa:[""]
    })
    console.log("length of bag count",this.bag);
  }

}
