import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
  verylongString = [];

  constructor() {}

  getListOfOwners() {
    return this.verylongString;
  }

  ngOnInit() {}

  // public changeListener2(files: FileList) {
  //   // console.log(files);
  //   if (files && files.length > 0) {
  //     let file: File = files.item(0);
  //     // console.log(file.name);
  //     // console.log(file.size);
  //     // console.log(file.type);
  //     let reader: FileReader = new FileReader();
  //     reader.readAsText(file);
  //     reader.onload = e => {
  //       let csv: string = reader.result as string;
  //       console.log(csv);
  //       this.verylongString = csv;
  //     };
  //   }
  // }

  public changeListener(files: FileList) {
    // console.log(files);
    if (files && files.length > 0) {
      let file: File = files.item(0);
      // console.log(file.name);
      // console.log(file.size);
      // console.log(file.type);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = e => {
        const res = reader.result as string; // This variable contains your file as text
        const lines = res.split("\n"); // Splits you file into lines
        const ids = [];

        lines.forEach(line => {
          var ownerJson: {
            ownerId: number;
            fullname: string;
            property: string;
            participation: string;
          } = { ownerId: 0, fullname: "", property: "", participation: "" };

          ownerJson.ownerId = ids.length + 1;
          ownerJson.fullname = line.split(",")[0];
          ownerJson.property = line.split(",")[1];
          ownerJson.participation = line.split(",")[1];

          // ids.push(ownerJson);
          ids.push(JSON.stringify(ownerJson));
        });

        console.log(ids);
        this.verylongString = ids;
      };
    }
  }
}
