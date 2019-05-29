import { Component, OnInit } from "@angular/core";
// import { Http, Response } from "@angular/core";
// import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
  csvUrl: string =
    "/home/roman/cod/Angular_Projects/09_WilenskaVote/WilenskaVote/wvote/src/app/contact/wilenska.csv"; // URL to web API
  csvData: any[] = [];

  // constructor(private http: HttpClient) {
  //   this.fs
  //     .createReadStream("wilenska.csv")
  //     .pipe(csv())
  //     .on("data", function(data) {
  //       console.log(data);
  //     })
  //     .on("end", function(data) {
  //       console.log("Read the end");
  //     });
  // }

  ngOnInit() {
    this.http
      .get("wilenska.csv", { responseType: "text" })
      .forEach(n => console.log(n));
  }

  // constructor(private http: HttpClient) {
  //   this.http.get(this.csvUrl).subscribe(response => console.log(response));
  // }

  // constructor() {
  //   this.extractData(this.csvUrl);
  // }

  // private extractData(data) {
  //   // Input csv data to the function
  //   let csvData = data;
  //   let allTextLines = csvData.split(/\r\n|\n/);
  //   let headers = allTextLines[0].split(",");
  //   let lines = [];

  //   for (let i = 0; i < allTextLines.length; i++) {
  //     // split content based on comma
  //     let data = allTextLines[i].split(",");
  //     if (data.length == headers.length) {
  //       let tarr = [];
  //       for (let j = 0; j < headers.length; j++) {
  //         tarr.push(data[j]);
  //       }
  //       lines.push(tarr);
  //     }
  //   }
  //   console.log(lines); //The data in the form of 2 dimensional array.
  // }

  // ngOnInit() {
  //   this.http
  //     .get("wilenska_03.csv", { responseType: "text" })
  //     .subscribe(data => {
  //       var objs = d3.csvParse(data);
  //       this.createChart(objs);
  //     });
  // }
}
