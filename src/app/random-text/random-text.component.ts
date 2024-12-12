import { Component } from '@angular/core';
import { TextGeneratorService } from '../services/text-generator.service';

@Component({
  selector: 'app-random-text',
  templateUrl: './random-text.component.html',
  styleUrls: ['./random-text.component.css']
})
export class RandomTextComponent {

  constructor(private textGeneratorService: TextGeneratorService){ }

  async write(){
    this.textGeneratorService.write();
  }
}
