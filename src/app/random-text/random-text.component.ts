import { Component } from '@angular/core';
import { TextGeneratorService } from '../services/text-generator.service';

@Component({
  selector: 'app-random-text',
  templateUrl: './random-text.component.html',
  styleUrls: ['./random-text.component.css']
})
export class RandomTextComponent {

  monkeys: number = 1000;

  constructor(
    private textGeneratorService: TextGeneratorService
  ){ 
    this.write();
  }

  async write(){
    for(var i = 0; i < this.monkeys; i++){
      this.textGeneratorService.write();
    } 
  }
}
