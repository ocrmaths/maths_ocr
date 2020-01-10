import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  SERVER_URL = 'http://'+window.location.hostname+':5005/';
  aValue; bValue; xValue; yValue;
  file;
  fileName;
  jsondata; jsondata1; jsondata2;
  loaderhide_Show = false; 
responseErrortext;
noDataFound =  false;


  constructor(private httpService: HttpClient) {}

  ngOnInit() { }

  onFileSelect(event) {
     
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      
      this.fileName = file;
      this.file = event.target.files[0].name;
    
    }
  }
  onSubmit() {
    this.loaderhide_Show = true;
    const formData = new FormData();
    formData.append('file', this.fileName);
    //alert(JSON.stringify(this.filename));
    this.httpService.post<any>(this.SERVER_URL+'api/OCR/upload?' + 'A=' + this.aValue + '&B=' + this.bValue + "&X=" + this.xValue + "&Y=" + this.yValue, formData).subscribe(
      response => {
 this.noDataFound  =  false;
       
        this.jsondata = this.SERVER_URL+'static/' +response.image1;
        this.jsondata1 = this.SERVER_URL+'static/' +response.image2;
        this.jsondata2 = this.SERVER_URL+'static/' +response.image3;
        this.loaderhide_Show = false;       

      },
      (err) => {                             
            if(err.status == '404')
            {
              this.noDataFound  =  true;  
              this.responseErrortext = err.error.response;
            }
            if(err.status == '0'){
                this.noDataFound  =  true;  
                this.responseErrortext = "Http failure response -�403 Forbidden";
            }            
             this.loaderhide_Show = false;   
      }
    );
  }
}
