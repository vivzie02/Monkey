import { Component } from '@angular/core';
import * as germanWords from '../../assets/german-words.json';

@Component({
  selector: 'app-random-text',
  templateUrl: './random-text.component.html',
  styleUrls: ['./random-text.component.css']
})
export class RandomTextComponent {
  currentSentence: string = "";
  TIME_BETWEEN_LETTERS: number = 10;
  book: string = "";
  currentWord: string = "";
  isActive: boolean = false;
  dict: string[] = (germanWords as any).default;

  constructor(){}

  async write(){
    if(this.isActive){
      return;
    }

    this.isActive = true;
    while(this.isActive){
      var word = await this.randomWord();
      if(this.dict.includes(word)){
        this.book += word + " ";
      }
      else if(this.book != ""){
        //send book
        console.log("book: ", this.book);
        this.book = "";
      }

      this.currentSentence += word;
      this.currentSentence += " ";
      this.currentWord = "";
    }
  }

  clear(){
    this.pause();
    this.currentSentence = "";
    this.currentWord = "";
  }

  pause(){
    this.isActive = false;
  }

  async randomWord(): Promise<string>{
    var chanceToCancel = 0;
    var x = 0;

    do{
      x++;
      this.currentWord += await this.randomLetter();
      chanceToCancel = this.enhancedSigmoid(x);
    }while(chanceToCancel < Math.random());

    return this.currentWord;
  }

  async randomLetter(): Promise<string>{
    const options = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz";
    const optionsLength = options.length;
    await this.delay(this.TIME_BETWEEN_LETTERS);
    return options.charAt(Math.floor(Math.random() * optionsLength));
  }

  enhancedSigmoid(x: number): number{
    return 1 / (1 + Math.pow(Math.E, (x - 5) * (-1)));
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }  
}
