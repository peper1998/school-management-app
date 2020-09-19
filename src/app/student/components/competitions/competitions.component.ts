import { Component, OnInit } from "@angular/core";
import { Competition, CompetitionsService } from "src/app/_services/competitions/competitions.service";

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {
  competitions: Competition[];

  constructor(private competitionsService:CompetitionsService) { }

  ngOnInit(): void {
    this.competitionsService.getCompetitions().subscribe(res=>{
      this.competitions = res;
    })
  }

}
