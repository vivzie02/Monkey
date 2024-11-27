import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TextGeneratorService } from '../services/text-generator.service';

@Component({
  selector: 'app-random-text',
  templateUrl: './random-text.component.html',
  styleUrls: ['./random-text.component.css']
})
export class RandomTextComponent {
  currentSentence: string = "";
  private subscription?: Subscription;

  constructor(private textGeneratorService: TextGeneratorService){}

  ngOnInit() {
    this.subscription = this.textGeneratorService.currentSentence$.subscribe(
      sentence => this.currentSentence = sentence
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  write(){
    this.textGeneratorService.write();
  }

  pause(){
    this.textGeneratorService.pause();
  }

  clear(){
    this.textGeneratorService.clear();
  }
}
